import { Op } from "sequelize";
import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { Secret, sign } from "jsonwebtoken";
import { User } from "../models";
import CustomError from "../helpers/errorHandler/CustomError";
import { LoginSchema, SignUpSchema } from "../schemes";

import environment from "../config/environment";

// Signup controller
export const signup = async (req: Request, res: Response) => {
  const { firstName, lastName, username, email, password, confirmPassword } =
    req.body;

  await SignUpSchema({
    firstName,
    lastName,
    username,
    email,
    password,
    confirmPassword,
  });

  const user = await User.findOne({
    where: {
      [Op.or]: [{ email }, { username }],
    },
  });

  if (user) {
    throw new CustomError(400, "You already have an account");
  }

  const newUser : any= await User.create({
    firstName,
    lastName,
    username,
    email,
    password: await bcrypt.hash(password, 15),
  });

  const payload = {
    firstName: newUser.firstName,
    lastName: newUser.lastName,
    username: newUser.username,
    email: newUser.email,
  };

  const token = await sign(payload, environment.secretKey as Secret);

  res.json({
    token,
    id: newUser.id,
    ...payload,
  });
};

// Login controller
export const login = async (req: Request, res: Response) => {
  const { secretKey } = environment;
  const { email, password } = req.body;

  await LoginSchema({ email, password });

  const user : any= await User.findOne({ where: { email } });

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
    firstName: user.firstName,
    lastName: user.lastName,
    username: user.username,
    email: user.email,
  };
  const token = sign(payload, secretKey as Secret);

  res.set("token", token).json({
    status: 200,
    data: {
      id: user.id,
      ...payload,
      token,
    },
  });
};
