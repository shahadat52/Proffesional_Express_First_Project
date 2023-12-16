import { userService } from './user.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';

const createStudent = catchAsync(async (req, res) => {
  const { password, student: studentData } = req.body;
  const result = await userService.createStudentInDb(password, studentData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student is created successful',
    data: result,
  });
});
const createFaculty = catchAsync(async (req, res) => {
  const { password, faculty } = req.body;
  // console.log({ password }, { faculty });
  const result = await userService.createFacultyInDB(password, faculty);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty is created successfully',
    data: result,
  });
});

// const createFaculty = catchAsync(async(req, res)=>{
//   const {facultyData} = req.body;
//   const result = await userService.createFacultyInDB(facultyData)
//   return result
// })

export const userController = {
  createStudent,
  createFaculty,
};
