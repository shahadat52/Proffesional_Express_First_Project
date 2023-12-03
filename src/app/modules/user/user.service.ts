import mongoose from 'mongoose';
import config from '../../config';
import { TAcademicSemester } from '../academicSemester/academicSemester.interface.';
import { AcademicSemesterModel } from '../academicSemester/academicSemester.model';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { TUser } from './user.interface';
import { UserModel } from './user.model';
import generateStudentID from './user.utils';
import AppError from '../../errors/appErrors'

const createStudentInDb = async (password: string, payload: TStudent) => {
  //firstly I have to create a user then I will create a student
  const userData: Partial<TUser> = {};

  // find admission semester
  const admissionSemester =
    ((await AcademicSemesterModel.findById(
      payload.admissionSemester,
    )) as TAcademicSemester) || null;

  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    //set generated id
    userData.id = await generateStudentID(admissionSemester);

    //if password not sent from client then set default password
    userData.password = password || (config.default_pass as string);

    //set user role
    userData.role = 'student';

    //create user in userModel
    const newUser = await UserModel.create([userData], { session });

    // console.log('newStudent', await newUser);
    //create student
    if (!newUser.length) {
      throw new AppError(404, 'Failed to create user');
    }
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id;

    const newStudent = await Student.create([payload], { session });
    if (!newStudent) {
      throw new Error('Failed to create student');
    }
    await session.commitTransaction();
    await session.endSession();
    return newStudent;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    
  }
};
export const userService = {
  createStudentInDb,
};
