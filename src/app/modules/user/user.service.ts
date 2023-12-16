import mongoose from 'mongoose';
import config from '../../config';
import { TAcademicSemester } from '../academicSemester/academicSemester.interface.';
import { AcademicSemesterModel } from '../academicSemester/academicSemester.model';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { TUser } from './user.interface';
import { UserModel } from './user.model';
import AppError from '../../errors/appErrors';
import { generateStudentID } from './user.utils';
import { TFaculty } from '../faculty/faculty.interface';
import { FacultyModel } from '../faculty/faculty.model';

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

//F-0001
const generateFacultyID = async () => {
  const lastFaculty = await UserModel.findOne({ role: 'faculty' }).sort(
    '-createdAt',
  );
  let lastFacultyId = lastFaculty?.id;
  lastFacultyId = lastFacultyId?.split('-')[1];
  let currentId = lastFacultyId || (0).toString();
  const faculty = 'F-';
  currentId = (Number(currentId) + 1).toString().padStart(4, '0');
  currentId = faculty + currentId;
  return currentId;
};
generateFacultyID();
const createFacultyInDB = async (password: string, faculty: TFaculty) => {
  // console.log(faculty);
  const userData: Partial<TUser> = {};

  userData.role = 'faculty';
  userData.id = await generateFacultyID();
  userData.password = password || config.default_pass;
  const facultyUser = await UserModel.create([userData]);
  if (!facultyUser.length) {
    throw new AppError(400, 'User created unsuccessful');
  }
  faculty.id = facultyUser[0]?.id
  const result = await FacultyModel.create(faculty);
  if (!result) {
    throw new AppError(400, 'Faculty created unsuccessful');
  }
  return result;
};

export const userService = {
  createStudentInDb,
  createFacultyInDB,
};
