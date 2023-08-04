import { NextFunction, Request, Response } from "express";
import { verifyJWT } from "../utils";

export type UserJWT = Required<Pick< any, "id" | "email">>;

const isAuth = async (req: Request, res: Response, next: NextFunction) => {
  const headerToken = req.header("Authorization");
  const authToken = headerToken?.split("Bearer ")?.[1];
  if (!authToken) {
    throw new Error("Unauthorized");
  }
  const user = await verifyJWT<UserJWT>(authToken);
  req.user = user;
  next();
};

export default isAuth;
