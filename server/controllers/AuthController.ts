import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { Secret, sign } from "jsonwebtoken";
import { User } from "../models";
import CustomError from "../helpers/errorHandler/CustomError";
import { LoginSchema, SignUpSchema } from "../schemes";
import { verifyJWT } from "../utils";
import environment from "../config/environment";
import { IUser } from "../interfaces";
// Signup controller
export const signup = async (req: Request, res: Response) => {
  const { firstName, lastName, email, password, confirmPassword } = req.body;

  await SignUpSchema({
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
  });

  const user = await User.findOne({ where: { email } });

  if (user) {
    throw new CustomError(400, "You already have an account");
  }

  const newUser: any = await User.create({
    firstName,
    lastName,
    email,
    password: await bcrypt.hash(password, 15),
  });

  const payload = {
    id: newUser.id,
    firstName: newUser.firstName,
    lastName: newUser.lastName,
    email: newUser.email,
  };

  const token = await sign(payload, environment.secretKey as Secret);

  res.cookie("token", token).json({
    token,
    ...payload,
  });
};
// signOut controller
export const signOut = async (req: Request, res: Response) => {
  console.log('ssssssssssss')
  res.clearCookie("token").json({
    status: 200,
    msg: "signed out successfully",
  });
};

// Login controller
export const login = async (req: Request, res: Response) => {
  const { secretKey } = environment;
  const { email, password } = req.body;

  await LoginSchema({ email, password });

  const user: any = await User.findOne({ where: { email } });

  if (!user) {
    throw new CustomError(
      404,
      "The email address you entered isn't connected to an account"
    );
  }

  const isValid: boolean = await bcrypt.compare(password, user.password ?? "");

  if (!isValid) {
    throw new CustomError(422, "The password that you've entered is incorrect");
  }

  const payload = {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
  };
  const token = sign(payload, secretKey as Secret);

  res.cookie("token", token).json({
    status: 200,
    data: {
      ...payload,
      token,
    },
  });
};

// user data controller
// export type UserJWT = Required<Pick< any, "id" | "email">>;

export const userData = async (req: Request, res: Response) => {
  try {
    console.log("5555555");
    const { token } = req.body;
    console.log(token);
    const { id, firstName, lastName, email } = (await verifyJWT(
      token
    )) as IUser;

    console.log({ id, firstName, lastName, email, token });
    res.status(200).json({
      status: 200,
      data: { id, firstName, lastName, email, token },
      token,
    });
  } catch (error) {
    console.log(error);
    throw new CustomError(422, "Unauthorized");
  }
};
