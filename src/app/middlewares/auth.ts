import { NextFunction, Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import AppError from '../errors/appErrors';
import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';

const auth = (...requireRole: any[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    if (!token) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        'This user is unauthorized!!',
      );
    }

    jwt.verify(token, config.secret_key as string, function (err, decoded) {
      if (err) {
        throw new AppError(httpStatus.UNAUTHORIZED, 'User is Unauthorized');
      }
      const role = decoded?.data.role;
      if (requireRole && !requireRole.includes(role)) {
        throw new AppError(httpStatus.UNAUTHORIZED, 'User is Unauthorized');
      }
      req.user = decoded as JwtPayload;
      next();
    });
  });
};

export default auth;
