import {  AnyZodObject } from 'zod';
import BadRequestError from '../middlewares/errorHandlers/BadRequestHandler';

function validate<T>(schema: AnyZodObject, input: unknown): asserts input is T {
  const valid = schema.parse(input);

  if (!valid) {
    throw new BadRequestError({  message: `Invalid Input.`, logging: true });
  }
};

export default validate;