import * as Joi from 'joi';
import { ISignupSchema } from "../interfaces";

const signupValid = (body: ISignupSchema) => {
  const schema = Joi.object({
    fullName: Joi.string().min(4).max(50).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(15).required(),
    confirmPassword: Joi.any().valid(Joi.ref('password')).required(),
  });
  return schema.validateAsync(body);
};
export default signupValid;
