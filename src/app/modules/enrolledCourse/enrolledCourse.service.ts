/* eslint-disable @typescript-eslint/no-explicit-any */
import AppError from '../../errors/appErrors';
import isExists from '../../utils/isExists';
import { UserModel } from '../user/user.model';
import { TEnrolledCourse } from './enrolledCourse.interface';
import { EnrolledCourseModel } from './enrolledCourse.model';

const createEnrolledCourseInDB = async (
  user: any,
  payload: TEnrolledCourse,
) => {
  const userAlready = await isExists(user.id, UserModel);
  if (!userAlready) {
    throw new AppError(400, 'user not found');
  }
  console.log({ userAlready });
  const result = await EnrolledCourseModel.create(payload);
  return result;
};

export const enrolledCourseServices = {
  createEnrolledCourseInDB,
};
