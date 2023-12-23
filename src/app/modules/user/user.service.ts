import mongoose from 'mongoose';
import config from '../../config';
import { TAcademicSemester } from '../academicSemester/academicSemester.interface.';
import { AcademicSemesterModel } from '../academicSemester/academicSemester.model';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { TUser } from './user.interface';
import { UserModel } from './user.model';
import AppError from '../../errors/appErrors';
import { generateID, generateStudentID } from './user.utils';
import { TFaculty } from '../faculty/faculty.interface';
import { FacultyModel } from '../faculty/faculty.model';
import { TAdmin } from '../admin/admin.interface';
import httpStatus from 'http-status';
import { AdminModel } from '../admin/admin.model';

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
    // set user email
    userData.email = payload.email;
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
      return;
      // throw new Error('Failed to create student');
    }
    await session.commitTransaction();
    await session.endSession();
    return newStudent;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    // throw new Error(error.message)
    throw new AppError(400, `${(error as Error).message}`);
  }
};

const createFacultyInDB = async (password: string, faculty: TFaculty) => {
  // console.log(faculty);
  const userData: Partial<TUser> = {};

  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    userData.role = 'faculty';
    // set faculty email
    userData.email = faculty.email;
    userData.id = await generateID('F-');
    userData.password = password || config.default_pass;
    console.log(userData);
    const facultyUser = await UserModel.create([userData], { session });
    if (!facultyUser.length) {
      throw new AppError(400, 'User created unsuccessful');
    }
    faculty.id = facultyUser[0]?.id;
    faculty.user = facultyUser[0]._id;
    const result = await FacultyModel.create([faculty], { session });
    if (!result.length) {
      throw new AppError(400, 'Faculty created unsuccessful');
    }
    await session.commitTransaction();
    await session.endSession();
    return result;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(error);
  }
};

const createAdminIntoDB = async (password: string, payload: TAdmin) => {
  // create a user object
  const userData: Partial<TUser> = {};

  //if password is not given , use default password
  userData.password = password || (config.default_pass as string);

  //set student role
  userData.role = 'admin';
  // set admin email
  userData.email = payload.email;

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    //set  generated id
    userData.id = await generateID('A-');

    // create a user (transaction-1)
    const newUser = await UserModel.create([userData], { session });

    //create a admin
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create admin');
    }
    // set id , _id as user
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id; //reference _id

    // create a admin (transaction-2)
    const newAdmin = await AdminModel.create([payload], { session });

    if (!newAdmin.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create admin');
    }

    await session.commitTransaction();
    await session.endSession();

    return newAdmin;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

const changeStatusInDB = async (status, userId, user) => {
  console.log({ status });
  console.log({ user });
  const result = await UserModel.findByIdAndUpdate(
    userId,
    {
      status,
    },
    { new: true },
  );
  return result;
};

export const userService = {
  createStudentInDb,
  createFacultyInDB,
  createAdminIntoDB,
  changeStatusInDB,
};
