import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { academicDepartmentServices } from './academicDepartment.service';
import { TAcademicDepartment } from './academicDepartment.interface';

const createAcademicDepartment = catchAsync(async (req, res) => {
  const departmentData = req.body;
  const result =
    await academicDepartmentServices.createAcademicDepartmentInDB(
      departmentData,
    );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic department create successflly',
    data: result,
  });
});

//Get all academic department
const getAllAcademicDepartment = catchAsync(async (req, res) => {
  const result =
    await academicDepartmentServices.getAllAcademicDepartmentInDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All academic department retrieve successfull',
    data: result,
  });
});

const getSingleAcademicDepartment = catchAsync(async (req, res) => {
  const { departmentId } = req.params;
  const result =
    await academicDepartmentServices.getSingleAcademicDepartmentFromDB(
      departmentId,
    );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Single Academic department Retrieve successfully',
    data: result,
  });
});

const updateAcademicDepartment = catchAsync(async (req, res) => {
  const {departmentId} = req.params;
  const departmentData:Partial<TAcademicDepartment> = req.body;
  const result = await academicDepartmentServices.updateAcademicDepartmentInDB(
    departmentId,
    departmentData,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic department data updated successfully',
    data: result,
  });
});

export const academicDepartmentControllers = {
  createAcademicDepartment,
  getAllAcademicDepartment,
  getSingleAcademicDepartment,
  updateAcademicDepartment
};
