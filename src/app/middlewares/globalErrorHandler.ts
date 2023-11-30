import { NextFunction, Request, Response } from 'express';
import { Error } from 'mongoose';

const globalErrorHandler = (
  err: Error,
  req: Request,
  res: Response,
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  next: NextFunction,
) => {
  const statusCode = 500;
  const message = err.message || 'Something went wrong';
  res.status(statusCode).json({
    success: false,
    message,
    test: 'From middleware',
    error: err,
  });
};

export default globalErrorHandler
