import { userService } from './user.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';

const createStudent = catchAsync(async (req, res) => {
  const { path } = req.file;
  console.log({path});
  const { password, student: studentData } = req.body;
  const result = await userService.createStudentInDb(
    password,
    studentData,
    path,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student is created successful',
    data: result,
  });
});
const createFaculty = catchAsync(async (req, res) => {
  const { password, faculty } = req.body;
  const result = await userService.createFacultyInDB(password, faculty);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty is created successfully',
    data: result,
  });
});

const createAdmin = catchAsync(async (req, res) => {
  const { password, admin: adminData } = req.body;

  const result = await userService.createAdminIntoDB(password, adminData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin is created succesfully',
    data: result,
  });
});

const changeStatus = catchAsync(async (req, res) => {
  const { status } = req.body;
  const { userId } = req.params;
  const user = req.user;
  const result = await userService.changeStatusInDB(status, userId, user);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Status change successful',
    data: result,
  });
});

export const userController = {
  createStudent,
  createFaculty,
  createAdmin,
  changeStatus,
};
