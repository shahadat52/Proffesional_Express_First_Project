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
    message: 'User is created successful',
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
  // createFaculty
};
