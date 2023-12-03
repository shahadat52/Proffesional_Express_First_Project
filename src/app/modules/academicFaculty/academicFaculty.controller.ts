import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { academicFacultiesServices } from './academicFaculty.service';

const createAcademicFaculty = catchAsync(async (req, res) => {
  const facultyData = req.body;
  const result =
    await academicFacultiesServices.createAcademicFacultyInDb(facultyData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Faculty Created successfully',
    data: result,
  });
});

//Get All Academic Faculties
const getAllAcademicFaculties = catchAsync(async (req, res) => {
  const result = await academicFacultiesServices.getAllAcademicFacultiesInDb();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All Faculties Data retrieve successfully ',
    data: result,
  });
});

//Get specific Faculty
const getSingleAcademicFaculty = catchAsync(async (req, res) => {
  const { facultyId } = req.params;
  const result =
    await academicFacultiesServices.getSingleAcademicFacultyInDB(facultyId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Specific faculty data retrieve successful',
    data: result,
  });
});

//Update specific faculty
const updateAcademicFaculty = catchAsync(async (req, res) => {
  const { facultyId } = req.params;
  const data = req.body;
  const result =
    await academicFacultiesServices.updateSingleAcademicFacultyInDB(facultyId, data);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'specific faculty updated successful',
    data: result,
  });
});

export const academicFacultiesControllers = {
  createAcademicFaculty,
  getAllAcademicFaculties,
  getSingleAcademicFaculty,
  updateAcademicFaculty,
};
