import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { offeredCourseServices } from './offeredCourse.service';

const createOfferedCourse = catchAsync(async (req, res) => {
  const result = await offeredCourseServices.createOfferedCourseInDB(req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: `Offered course create successful`,
    data: result,
  });
});

const getAllOfferedCourse = catchAsync(async (req, res) => {
  const result = await offeredCourseServices.getAllOfferedCourseFromDB(
    req.query,
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: `All Offered course retrieve successful`,
    data: result,
  });
});

const updateOfferedCourse = catchAsync(async (req, res) => {
  const { offeredCourseId } = req.params;
  const result = await offeredCourseServices.updateOfferedCourseInDB(
    offeredCourseId,
    req.body,
  );
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: `Offered course data updated successful`,
    data: result,
  });
});

export const offeredCourseCollections = {
  createOfferedCourse,
  getAllOfferedCourse,
  updateOfferedCourse,
};
