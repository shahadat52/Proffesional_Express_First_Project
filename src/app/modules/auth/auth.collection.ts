import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import { authServices } from './auth.service';
import sendResponse from '../../utils/sendResponse';

const login = catchAsync(async (req, res) => {
  const result = await authServices.loginUser(req.body);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User is logged successfully',
    data: result,
  });
});

export const authCollections = {
  login,
};
