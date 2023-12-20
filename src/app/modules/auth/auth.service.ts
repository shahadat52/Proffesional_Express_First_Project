import httpStatus from 'http-status';
import bcrypt from 'bcrypt';
import AppError from '../../errors/appErrors';
import { UserModel } from '../user/user.model';
import { TLoginUser } from './auth.interface';
import jwt from 'jsonwebtoken';
import config from '../../config';

const loginUser = async (payload: TLoginUser) => {
  /*
    1) check id is available in collection
    2) check isDeleted true ?
    3) check is blocked ?
    */
  const user = await UserModel.findOne({ id: payload?.id });
  // if (!user) {
  //   throw new AppError(httpStatus.NOT_FOUND, 'User not available');
  // }

  if (!(await UserModel.isUserExists(payload.id))) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not available');
  }
  const isDeleted = user?.isDeleted;
  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'User is already deleted');
  }
  const status = user?.status;
  if (status === 'blocked') {
    throw new AppError(httpStatus.FORBIDDEN, 'User is blocked');
  }
  const matchPassword = await bcrypt.compare(payload.password, user.password);
  console.log(matchPassword);

  const jwtPayload = {
    id: user?.id,
    password: user?.password,
  };
  const accessToken = jwt.sign(
    {
      data: jwtPayload,
    },
    config.secret_key as string,
    { expiresIn: '10d' },
  );
  console.log(accessToken);

  return {
    accessToken,
    
  };
};

export const authServices = {
  loginUser,
};
