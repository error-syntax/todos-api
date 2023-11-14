import { NextFunction, Request, Response } from 'express';
import { CustomError } from './errorHandlers/CustomErrorHandler';

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  // Handled errors
  if(err instanceof CustomError) {
    const { statusCode, errors, logging } = err;
    if(logging) {
      console.error(JSON.stringify({
        code: err.statusCode,
        errors: err.errors,
        stack: err.stack,
      }, null, 2));
    }

    return res.status(statusCode).send({ errors });
  }

  // Unhandled errors
  res.status(500).send({ errors: [{ message: err.message, name: err.name, stack: err.stack }] });
};