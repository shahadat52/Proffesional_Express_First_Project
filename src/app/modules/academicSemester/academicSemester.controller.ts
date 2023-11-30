import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import { academicSemesterServices } from './academicSemester.service';

const createAcademicSemester = catchAsync(async (req, res) => {
  const result = await academicSemesterServices.createAcademicSemesterInDB(
    req.body,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic semester created successfully',
    data: result,
  });
});

const getAllAcademicSemester = catchAsync(async (req, res) => {
  const result = await academicSemesterServices.getAllSemesterFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All Academic semester Retrieve successfully',
    data: result,
  });
});

//Get single semester
const getSingleSemester = catchAsync(async (req, res) => {
  const { semesterId } = req.params;
  const result =
    await academicSemesterServices.getSingleSemesterFromDB(semesterId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Single Academic semester Retrieve successfully',
    data: result,
  });
});

//single semester update
const updateSingleSemester = catchAsync(async (req, res) => {
  const { semesterId } = req.params;
  const data = req.body;
  const result = await academicSemesterServices.updateSingleSemesterInDB(
    semesterId,
    data,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `Specific semester data update successful`,
    data: result,
  });
});
export const academicSemesterControllers = {
  createAcademicSemester,
  getAllAcademicSemester,
  getSingleSemester,
  updateSingleSemester,
};
