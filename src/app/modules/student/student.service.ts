import { Student } from './student.model';

//service will query in DB

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
  if (await Student.isUserExists(id)) {
    const result = await Student.updateOne(
      { id: id },
      { $set: { isDeleted: true } },
    );
    return result;
  }
  throw new Error('Student Not Found');
};
const updateStudentContactNoToDb = async () => {
  const result = await Student.updateMany(
    {},
    { $set: { maritalStatus: false } },
  );
  return result;
};

export const StudentService = {
  getAllStudentFromDb,
  getSingleStudentFromDb,
  deleteStudentFromDb,
  updateStudentContactNoToDb,
};
