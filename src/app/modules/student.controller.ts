import { Request, Response } from 'express';
import { StudentService } from './student.service';

//controller fn will call service fn
const createStudent = async (req: Request, res: Response) => {
  try {
    const student = req.body.student;
    const result = await StudentService.createStudentIntoDb(student);
    res.status(200).json({
      success: true,
      message: 'Student create successfully',
      data: result,
    });
  } catch (error) {
    console.log(error);
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
  } catch (error) {
    console.log(error);
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
    console.log(error);
  }
};

export const studentControllers = {
  createStudent,
  getStudents,
  getSingleStudent,
};
