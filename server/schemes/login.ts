import joi from "joi";
import { ILoginSchema } from "../interfaces";

const signInSchemaValidation = (body: ILoginSchema) => {
  const schema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(5).max(50).required(),
  });
  return schema.validateAsync(body);
};

export default signInSchemaValidation;
