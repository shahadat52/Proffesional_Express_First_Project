import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { enrolledCourseServices } from './enrolledCourse.service';

const createEnrolledCourse = catchAsync(async (req, res) => {
  const user = req.user;
  const result = await enrolledCourseServices.createEnrolledCourseInDB(
    user,
    req.body,
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: `Enrolled course create successful`,
    data: result,
  });
});

const getAllEnrolledCourse = catchAsync(async (req, res) => {
  const result = await enrolledCourseServices.getAllEnrolledCourseFromDB();

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: `Enrolled course data retrieve successful`,
    data: result,
  });
});

const updateEnrolledCourseMarks = catchAsync(async (req, res) => {
  const facultyId = req.user.data.id;
  const result = await enrolledCourseServices.updateEnrolledCourseMarksInDB(
    facultyId,
    req.body,
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: `Course Marks update successful`,
    data: result,
  });
});

export const enrolledCourseCollections = {
  createEnrolledCourse,
  getAllEnrolledCourse,
  updateEnrolledCourseMarks,
};
