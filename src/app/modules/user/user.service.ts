import config from '../../config';
import { TAcademicSemester } from '../academicSemester/academicSemester.interface.';
import { AcademicSemesterModel } from '../academicSemester/academicSemester.model';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { TUser } from './user.interface';
import { UserModel } from './user.model';
import generateStudentID from './user.utils';

const createStudentInDb = async (password: string, studentData: TStudent) => {
  //firstly I have to create a user then I will create a student
  const userData: Partial<TUser> = {};

  // find admission semester
  const admissionSemester =
    ((await AcademicSemesterModel.findById(
      studentData.admissionSemester,
    )) as TAcademicSemester) || null;

  //set generated id
  userData.id = await generateStudentID(admissionSemester);

  //if password not sent from client then set default password
  userData.password = password || (config.default_pass as string);

  //set user role
  userData.role = 'student';

  //create user in userModel
  const newUser = await UserModel.create(userData);

  //create student
  if (Object.keys(newUser).length) {
    studentData.id = newUser.id;
    studentData.user = newUser._id;
    const newStudent = await Student.create(studentData);
    return newStudent;
  }
};

export const userService = {
  createStudentInDb,
};
