/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import httpStatus from 'http-status';
import AppError from '../../errors/appErrors';
import { OfferedCourseModel } from '../offeredCourse/offeredCourse.model';
import { UserModel } from '../user/user.model';
import { TEnrolledCourse } from './enrolledCourse.interface';
import { EnrolledCourseModel } from './enrolledCourse.model';
import { CourseModel } from '../course/course.model';
import { SemesterRegistrationModel } from '../semesterRegistration/semesterRegistration.model';
import mongoose from 'mongoose';

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
  const {
    semesterRegistration,
    academicSemester,
    academicDepartment,
    course,
    faculty,
  } = isOfferedCourseExists;
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

  const isExccedCredits = await EnrolledCourseModel.aggregate([
    {
      $match: {
        semesterRegistration,
        student: enrolledStudent._id,
      },
    },
    {
      $lookup: {
        from: 'courses',
        localField: 'course',
        foreignField: '_id',
        as: 'CourseData',
      },
    },
    {
      $unwind: '$CourseData',
    },
    {
      $group: {
        _id: null,
        fullDoc: { $push: '$$ROOT' },
        sumOfCredits: { $sum: '$CourseData.credits' },
      },
    },
    {
      $project: { _id: 0, sumOfCredits: 1 },
    },
  ]);

  const currentCredits = isExccedCredits[0].sumOfCredits + credits;
  const maximumCredits = semesterMaxCredits?.maxCredit as number;
  if (currentCredits > maximumCredits) {
    throw new AppError(400, 'You have exceeded maximum number of credits !');
  }

  payload.faculty = faculty;
  payload.student = enrolledStudent._id;
  payload.academicDepartment = academicDepartment;
  payload.academicSemester = academicSemester;
  payload.semesterRegistration = semesterRegistration;
  payload.course = course;
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const result = await EnrolledCourseModel.create([payload], { session });
    if (!result) {
      throw new AppError(400, 'Failed to enrolled course');
    }

    const capacity = isOfferedCourseExists.maxCapacity;
    const updateMaxCapacity = await OfferedCourseModel.findByIdAndUpdate(
      result[0].offeredCourse,
      { maxCapacity: capacity - 1 },
      { session },
    );
    await session.commitTransaction();
    await session.endSession();
    return result;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(400, 'Failed to enrolled course');
  }
};

const updateEnrolledCourseMarksInDB = async(user, payload) =>{

}

export const enrolledCourseServices = {
  createEnrolledCourseInDB,
  updateEnrolledCourseMarksInDB
};
