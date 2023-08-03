import * as Joi from 'joi';
import { IBookSchema } from "../interfaces";

const bookSchemaValidation = (body: IBookSchema) => {
  const schema = Joi.object({
    title: Joi.string().required(),
    author: Joi.string().required(),
    genre: Joi.string().required(),
    publicationYear: Joi.number().integer().required(),
    description: Joi.string().required(),
    image: Joi.string().required(),
  });
  return schema.validateAsync(body);
};

export default bookSchemaValidation;
