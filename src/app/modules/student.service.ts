import { Student } from './student.interface';
import { StudentModel } from './student.model';

//service will query in DB
const createStudentIntoDb = async (student: Student) => {
  const result = await StudentModel.create(student);
  return result;
};

const getAllStudentFromDb = async () => {
  const result = await StudentModel.find();
  return result;
};

const getSingleStudentFromDb = async (id: string) => {
  const result = await StudentModel.findOne({ id });
  return result;
};

export const StudentService = {
  createStudentIntoDb,
  getAllStudentFromDb,
  getSingleStudentFromDb,
};
