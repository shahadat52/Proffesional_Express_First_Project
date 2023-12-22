import httpStatus from 'http-status';
import bcrypt from 'bcrypt';
import AppError from '../../errors/appErrors';
import { UserModel } from '../user/user.model';
import { TLoginUser } from './auth.interface';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../../config';
import { createToken } from './auth.utils';

const loginUser = async (payload: TLoginUser) => {
  /*
    1) check id is available in collection
    2) check isDeleted true ?
    3) check is blocked ?
    */
  const user = await UserModel.findOne({ id: payload?.id }).select('+password');
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
  if (
    !(await UserModel.isPasswordMatch(
      payload.password,
      user?.password as string,
    ))
  ) {
    throw new AppError(httpStatus.FORBIDDEN, 'Incorrect Password');
  }
  // const matchPassword = await bcrypt.compare(payload.password, user.password);
  // console.log(matchPassword);

  const jwtPayload = {
    id: user?.id,
    role: user?.role,
  };
  const accessToken = jwt.sign(
    {
      data: jwtPayload,
    },
    config.secret_key as string,
    { expiresIn: '10d' },
  );

  const refreshToken = createToken(
    jwtPayload,
    config.refresh_key as string,
    '365d',
  );

  return {
    refreshToken,
    accessToken,
    needsPasswordChange: user?.needsPasswordChange,
  };
};

const changePasswordInDB = async (
  userData: JwtPayload,
  payload: { oldPassword: string; newPassword: string },
) => {
  const { id, role } = userData.data;
  const { oldPassword, newPassword } = payload;
  const user = await UserModel.findOne({ id, role }).select('+password');
  // if (!user) {
  //   throw new AppError(httpStatus.NOT_FOUND, 'User not available');
  // }

  if (!(await UserModel.isUserExists(id))) {
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
  // const matchPassword = await bcrypt.compare(
  //   oldPassword,
  //   user?.password as string,
  // );
  if (
    !(await UserModel.isPasswordMatch(oldPassword, user?.password as string))
  ) {
    throw new AppError(httpStatus.FORBIDDEN, 'Wrong password');
  }

  const hashPassword = bcrypt.hashSync(newPassword, Number(config.bcrypt_salt));

  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  const result = await UserModel.findOneAndUpdate(
    { id },
    {
      password: hashPassword,
      needsPasswordChange: false,
      passwordChangeTime: new Date(),
    },
    { new: true },
  );
  return 'Password change successful';
};

const refreshTokenFromDB = async (token: JwtPayload) => {
  const { refreshToken } = token;
  const decoded = jwt.verify(
    refreshToken as string,
    config.refresh_key as string,
  );
  const { id } = decoded.data;
  const user = await UserModel.findOne({ id }).select('+password');

  if (!(await UserModel.isUserExists(id))) {
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
  if (
    user?.passwordChangeTime &&
    (await UserModel.isPasswordChangeAfterTokenIssue(
      user.passwordChangeTime,
      decoded.iat as number,
    ))
  ) {
    throw new AppError(httpStatus.FORBIDDEN, 'Issued new token');
  }
  //end\\

  const jwtPayload = {
    id: user?.id,
    role: user?.role,
  };
  const accessToken = createToken(
    jwtPayload,
    config.secret_key as string,
    '10d',
  );
  return {
    accessToken,
  };
};

const forgetPasswordInDB = async (id: string) => {
  const user = await UserModel.findOne({ id }).select('+password');
  if (!(await UserModel.isUserExists(id))) {
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

  const jwtPayload = {
    id: user?.id,
    role: user?.role,
  };
  const resetToken = createToken(
    jwtPayload,
    config.secret_key as string,
    '10d',
  );

  const resetUiLink = `http://localhost:3000?id=${user?.id}&token=${resetToken}`;
  return resetUiLink;
};

export const authServices = {
  loginUser,
  changePasswordInDB,
  refreshTokenFromDB,
  forgetPasswordInDB,
};
