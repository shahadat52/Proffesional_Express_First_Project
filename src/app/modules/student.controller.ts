import { Request, Response } from 'express';
import { StudentService } from './student.service';
import studentValidationSchema from './validation/student.validation';
// import studentValidationSchema from './student.joi.validation';

//controller fn will call service fn
const createStudent = async (req: Request, res: Response) => {
  try {
    const { student: studentData } = req.body;

    const zodValidateData = studentValidationSchema.parse(studentData);
    // //data validation with zod

    // const { error, value } = studentValidationSchema.validate(studentData);

    // if (error) {
    //   return res.status(500).json({
    //     success: false,
    //     message: 'Something Went Wrong',
    //     error: error.details,
    //   });
    // }
    const result = await StudentService.createStudentIntoDb(zodValidateData);
    res.status(200).json({
      success: true,
      message: 'Student create successfully',
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
      error: err,
    });
  }
};

const getStudents = async (req: Request, res: Response) => {
  try {
    const result = await StudentService.getAllStudentFromDb();
    res.status(200).json({
      success: true,
      message: 'All students data retrieve successfully',
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
      error: err,
    });
  }
};

const getSingleStudent = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;
    const result = await StudentService.getSingleStudentFromDb(studentId);
    res.status(200).json({
      success: true,
      message: 'Student data retrieve successfully',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Student data retrieve unsuccessfully',
      data: error,
    });
  }
};

const deleteStudent = async (req: Request, res: Response) => {
  try {
    const studentId = req.params.studentId;
    console.log(studentId);
    const result = await StudentService.deleteStudentFromDb(studentId);
    res.status(200).json({
      success: true,
      message: 'student delete successfully',
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: 'student deleted not successful',
      data: error,
    });
  }
};

const updateStudentContactNo = async (req: Request, res: Response) => {
  try {
    // const phone = req.body.contactNo;
    // const { studentId } = req.params;
    const result = await StudentService.updateStudentContactNoToDb();
    res.status(200).json({
      success: true,
      message: 'Student contact number update successful',
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: 'Student contact number update unsuccessfully',
      error: error.message,
    });
  }
};

export const studentControllers = {
  createStudent,
  getStudents,
  getSingleStudent,
  deleteStudent,
  updateStudentContactNo,
};
