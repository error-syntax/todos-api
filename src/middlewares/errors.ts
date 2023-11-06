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
  console.error(err);
  res.status(500).send({ errors: [err] });
};