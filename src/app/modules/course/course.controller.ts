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
  const result = await courseServices.getAllCoursesFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All Courses data retrieve successfully',
    data: result,
  });
});

const getSingleCourse = catchAsync(async (req, res) => {
  const { courseId} = req.params;
  const result = await courseServices.getSingleCourseFromDB(courseId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Single course data retrieve successfully',
    data: result,
  });
});


const updateSingleCourse = catchAsync(async (req, res) => {
    const { courseId} = req.params;
    const result = await courseServices.deleteSingleCourse(courseId);
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Single course data retrieve successfully',
      data: result,
    });
  });

export const courseCollections = {
  createCourse,
  getAllCourses,
  getSingleCourse,
  updateSingleCourse
};
