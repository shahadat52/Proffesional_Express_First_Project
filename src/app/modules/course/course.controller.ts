import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { courseServices } from './course.service';

const createCourse = catchAsync(async (req, res) => {
  const result = await courseServices.createCourseInDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course created successfully',
    data: result,
  });
});

const getAllCourses = catchAsync(async (req, res) => {
  const result = await courseServices.getAllCoursesFromDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All Courses data retrieve successfully',
    data: result,
  });
});

const updateSpecificCourse = catchAsync(async (req, res) => {
  const { courseId } = req.params;
  const result = await courseServices.updateSpecificCourseInDB(
    courseId,
    req.body,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'update specific course data',
    data: result,
  });
});
const getSingleCourse = catchAsync(async (req, res) => {
  const { courseId } = req.params;
  const result = await courseServices.getSingleCourseFromDB(courseId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Single course data retrieve successfully',
    data: result,
  });
});

const deleteSingleCourse = catchAsync(async (req, res) => {
  const { courseId } = req.params;
  const result = await courseServices.deleteSingleCourseFromDB(courseId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course deleted successfully',
    data: result,
  });
});

const assignCourseFaculty = catchAsync(async (req, res) => {
  const { courseId } = req.params;
  const { faculties } = req.body;
  const result = await courseServices.assignCourseFacultyInDB(
    courseId,
    faculties,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course faculties create successful',
    data: result,
  });
});
const removeCourseFaculty = catchAsync(async (req, res) => {
  const { courseId } = req.params;
  const { faculties } = req.body;
  const result = await courseServices.removeCourseFacultyFromDB(
    courseId,
    faculties,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course faculty remove successful',
    data: result,
  });
});

export const courseCollections = {
  createCourse,
  getAllCourses,
  updateSpecificCourse,
  getSingleCourse,
  deleteSingleCourse,
  assignCourseFaculty,
  removeCourseFaculty
};
