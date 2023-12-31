import environment from "../config/environment";
import jwt from "jsonwebtoken";

const verifyJWT = <T>(token: string): Promise<T> =>
  new Promise((resolve, reject) => {
    jwt.verify(token, environment.secretKey, {}, (err, value) => {
      if (err) return reject(err);
      if (!value) return reject(new Error("no token value"));
      return resolve(value as T);
    });
  });

export default verifyJWT;
