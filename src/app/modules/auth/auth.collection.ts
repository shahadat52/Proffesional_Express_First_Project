import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import { authServices } from './auth.service';
import sendResponse from '../../utils/sendResponse';
import config from '../../config';

const login = catchAsync(async (req, res) => {
  const result = await authServices.loginUser(req.body);
  const { refreshToken } = result;
  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: config.node_env === 'production',
  });
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User is logged successfully',
    data: result,
  });
});

const changePassword = catchAsync(async (req, res) => {
  const { ...passwordData } = req.body;
  const result = await authServices.changePasswordInDB(req.user, passwordData);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Password change successfully',
    data: result,
  });
});

const refreshToken = catchAsync(async (req, res) => {
  const result = await authServices.refreshTokenFromDB(req.cookies);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Refresh token retrieved successfully',
    data: result,
  });
});

const forgetPassword = catchAsync(async (req, res) => {
  const { id } = req.body;
  const result = await authServices.forgetPasswordInDB(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Reset link sent to email successfully',
    data: result,
  });
});

const resetPassword = catchAsync(async (req, res) => {
  const token = req.headers.authorization;
  const { newPassword } = req.body;
  const result = await authServices.resetPasswordInDB(newPassword, (token as string));

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Password reset successfully',
    data: result,
  });
});

export const authCollections = {
  login,
  changePassword,
  refreshToken,
  forgetPassword,
  resetPassword,
};
