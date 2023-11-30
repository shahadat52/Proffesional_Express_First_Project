import { NextFunction, Request, Response } from 'express';
import { AnyZodObject } from 'zod';

const validateRequest = (schema: AnyZodObject) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(schema.parseAsync({ body: req.body })).catch((err) =>
      next(err),
    );
    next()
  };
};

export default validateRequest;
