import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { semesterRegistrationServices } from './semesterRegistration.servicel';

const createSemesterRegistration = catchAsync(async (req, res) => {
  const result =
    await semesterRegistrationServices.createSemesterRegistrationInDB(req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: `Semester Registration successful`,
    data: result,
  });
});

const getAllSemesterRegistration = catchAsync(async (req, res) => {
  const result =
    await semesterRegistrationServices.getAllSemesterRegistrationsFromDB(
      req.query,
    );
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: `All semester registration retrieve successful`,
    data: result,
  });
});

const getSingleSemesterRegistration = catchAsync(async (req, res) => {
  const { semesterRegistration } = req.params;
  const result =
    await semesterRegistrationServices.getSingleSemesterRegistrationFromDB(
      semesterRegistration,
    );
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: `Semester registration retrieve successful`,
    data: result,
  });
});

const updateSemesterRegistration = catchAsync(async (req, res) => {
  const { semesterRegistration } = req.params;
  const result =
    await semesterRegistrationServices.updateSemesterRegistrationInDB(
      semesterRegistration,
      req.body,
    );
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: `specific semester update successful`,
    data: result,
  });
});

export const semesterRegistrationCollections = {
  createSemesterRegistration,
  getAllSemesterRegistration,
  getSingleSemesterRegistration,
  updateSemesterRegistration,
};
