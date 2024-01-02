import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { enrolledCourseServices } from './enrolledCourse.service';

const createEnrolledCourse = catchAsync(async (req, res) => {
  const user = req.user;
  console.log({ user });
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

export const enrolledCourseCollections = {
  createEnrolledCourse,
};
