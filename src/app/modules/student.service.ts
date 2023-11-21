import { Error } from 'mongoose';
import { TStudent } from './student.interface';
import { Student } from './student.model';

//service will query in DB
const createStudentIntoDb = async (studentData: TStudent) => {
  //creating for static method

  if (await Student.isUserExists(studentData.id)) {
    throw new Error('Student already exists');
  }

  //creating for instance methods
  // const student = new Student(studentData);

  // if (await student.isUserExists(studentData.id)) {
  //   throw new Error('User Already exists');
  // }
  const result = await Student.create(studentData);
  return result;
};

const getAllStudentFromDb = async () => {
  const result = await Student.find();

  return result;
};
//[ { '$match': { '$ne': '12342445844' } } , { '$match': { '$ne': '12342445844' } } ]
const getSingleStudentFromDb = async (id: string) => {
  // const result = await Student.findOne({ id });
  const result = await Student.aggregate([{ $match: { id: id } }]);
  return result;
};

const deleteStudentFromDb = async (id: string) => {
  const result = await Student.updateOne(
    { id: id },
    { $set: { isDeleted: true } },
  );
  console.log(result);
  return result;
};
const updateStudentContactNoToDb = async () => {
  const result = await Student.updateMany(
    {},
    { $set: { maritalStatus: false } },
  );
  return result;
};

export const StudentService = {
  createStudentIntoDb,
  getAllStudentFromDb,
  getSingleStudentFromDb,
  deleteStudentFromDb,
  updateStudentContactNoToDb,
};
