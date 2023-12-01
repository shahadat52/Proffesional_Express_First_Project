import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { academicFacultiesServices,  } from './academicFaculty.service';

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
  console.log(result);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All Faculties Dataaaaaaaaaaaaaaa retrieve successfully ',
    data: result,
  });
});

export const academicFacultiesControllers = {
  createAcademicFaculty,
  getAllAcademicFaculties,
};
