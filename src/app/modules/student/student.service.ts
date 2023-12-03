import mongoose from 'mongoose';
import { Student } from './student.model';
import { UserModel } from '../user/user.model';
import { TStudent } from './student.interface';

//service will query in DB

const getAllStudentFromDb = async () => {
  const result = await Student.find();
  // .populate()
  // .populate('academicDepartment');

  return result;
};
//[ { '$match': { '$ne': '12342445844' } } , { '$match': { '$ne': '12342445844' } } ]
const getSingleStudentFromDb = async (id: string) => {
  const result = await Student.findOne({ id });
  // .populate('user')
  // .populate('admissionSemester')
  // .populate({
  //   path: 'academicDepartment',
  //   populate: { path: 'academicFaculty' },
  // });
  return result;
};

const deleteStudentFromDb = async (id: string) => {
  if (await Student.isUserExists(id)) {
    const session = await mongoose.startSession();
    try {
      session.startTransaction();
      const deletedStudent = await Student.findOneAndUpdate(
        { id: id },
        { isDeleted: true },
        { new: true, session },
      );
      if (!deletedStudent) {
        throw new Error('Failed to delete student');
      }

      const deletedUser = await UserModel.findOneAndUpdate(
        { id: id },
        { isDeleted: true },
        { new: true, session },
      );
      if (!deletedUser) {
        throw new Error('Failed to delete user');
      }

      await session.commitTransaction();
      await session.endSession();

      return deletedStudent;
    } catch (error) {
      await session.abortTransaction();
      await session.endSession();
    }
  }
  throw new Error('Student Not Found');
};
const updatedStudentInDB = async (id: string, payload: Partial<TStudent>) => {
  const { name, guardian, localGuardian, ...remainingStudentData } = payload;

  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingStudentData,
  };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value;
    }
  }

  if (guardian && Object.keys(guardian).length) {
    for (const [key, value] of Object.entries(guardian)) {
      modifiedUpdatedData[`guardian.${key}`] = value;
    }
  }

  if (localGuardian && Object.keys(localGuardian).length) {
    for (const [key, value] of Object.entries(localGuardian)) {
      modifiedUpdatedData[`localGuardian.${key}`] = value;
    }
  }

  console.log(modifiedUpdatedData);
  const result = await Student.updateOne({ id }, modifiedUpdatedData, {
    new: true,
    runValidators: true,
  });
  return result;
};

export const StudentService = {
  getAllStudentFromDb,
  getSingleStudentFromDb,
  deleteStudentFromDb,
  updatedStudentInDB,
};
