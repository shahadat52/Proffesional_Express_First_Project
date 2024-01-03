import httpStatus from 'http-status';
import AppError from '../../errors/appErrors';
import isExists from '../../utils/isExists';
import { OfferedCourseModel } from '../offeredCourse/offeredCourse.model';
import { UserModel } from '../user/user.model';
import { TEnrolledCourse } from './enrolledCourse.interface';
import { EnrolledCourseModel } from './enrolledCourse.model';
import { CourseModel } from '../course/course.model';
import { SemesterRegistrationModel } from '../semesterRegistration/semesterRegistration.model';

const createEnrolledCourseInDB = async (
  user: any,
  payload: TEnrolledCourse,
) => {
  /**
   * Step1: Check if the offered courses is exists
   * Step2: Check if the student is already enrolled
   * Step3: Check if the max credits exceed
   * Step4: Create an enrolled course
   */

  const { id } = user.data;
  const { offeredCourse } = payload;
  const isOfferedCourseExists =
    await OfferedCourseModel.findById(offeredCourse);
  if (!isOfferedCourseExists) {
    throw new AppError(400, 'Offered Course not found');
  }
  const { semesterRegistration, academicSemester, academicDepartment, course, faculty, student } =
    isOfferedCourseExists;
  // console.log({isOfferedCourseExists});
  const enrolledStudent = await UserModel.findOne({ id }).select('_id');
  if (!enrolledStudent) {
    throw new AppError(400, 'User not found');
  }

  const isStudentEnrolled = await EnrolledCourseModel.findOne({
    semesterRegistration,
    offeredCourse,
    student: enrolledStudent,
  });

  if (isStudentEnrolled) {
    throw new AppError(httpStatus.CONFLICT, 'Student is already enrolled');
  }

  const courses = await CourseModel.findById(course);
  const credits = courses?.credits;
  // console.log({credits});

  const semesterMaxCredits =
    await SemesterRegistrationModel.findById(semesterRegistration).select(
      'maxCredit',
    );

  console.log({ semesterMaxCredits });
  // const isExccedCredits = await 

  payload.faculty = faculty;
  payload.student = enrolledStudent._id;
  payload.academicDepartment = academicDepartment
  payload.academicSemester = academicSemester;
  payload.semesterRegistration = semesterRegistration
  payload.course = course

  const result = await EnrolledCourseModel.create(payload);
  if(!result){
    throw new AppError(400, 'Failed to enrolled course')
  }
  const capacity = isOfferedCourseExists.maxCapacity
  const updateMaxCapacity = await OfferedCourseModel.findByIdAndUpdate(result.offeredCourse, {maxCapacity: capacity -1})
  return result;
};

export const enrolledCourseServices = {
  createEnrolledCourseInDB,
};
