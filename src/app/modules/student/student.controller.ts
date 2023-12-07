// import { NextFunction, Request, Response } from 'express';
import { StudentService } from './student.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';

//controller fn will call service fn
const getStudents = catchAsync(async (req, res) => {

  const result = await StudentService.getAllStudentFromDb(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All students data retrieve successfully',
    data: result,
  });
});

// Retrieve a single student data
const getSingleStudent = catchAsync(async (req, res) => {
  const { studentId } = req.params;
  const result = await StudentService.getSingleStudentFromDb(studentId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student data retrieve successfully',
    data: result,
  });
});

const deleteStudent = catchAsync(async (req, res) => {
  const studentId = req.params.studentId;
  const result = await StudentService.deleteStudentFromDb(studentId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'student delete successfully',
    data: result,
  });
});

const updatedStudent = catchAsync(async (req, res) => {
  const { studentId } = req.params;
  const  {student}  = req.body;
  console.log("ggg",student);
  const result = await StudentService.updatedStudentInDB(
    studentId,
    student,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student contact number update successful',
    data: result,
  });
});

export const studentControllers = {
  getStudents,
  getSingleStudent,
  deleteStudent,
  updatedStudent,
};
