/* eslint-disable no-unused-vars */
import mongoose from 'mongoose';
import QueryBuilder from '../../builder/QueryBuilder';
import { searchableField } from './course.constant';
import { TCourse, TCourseFaculty } from './course.interface';
import { CourseFacultyModel, CourseModel } from './course.model';
import AppError from '../../errors/appErrors';
import httpStatus from 'http-status';

const createCourseInDB = async (payload: TCourse) => {
  const result = await CourseModel.create(payload);
  return result;
};

const getAllCoursesFromDB = async (query: Record<string, unknown>) => {
  const courseQuery = new QueryBuilder(CourseModel.find(), query)
    .search(searchableField)
    // .filter()
    .sort()
    .pagination();
  // .fields();
  const result = await courseQuery.modelQuery;
  return result;
};

const updateSpecificCourseInDB = async (
  id: string,
  payload: Partial<TCourse>,
) => {
  const { preRequisiteCourse, ...remainCourseData } = payload;

  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const updatedBasicCourseData = await CourseModel.findByIdAndUpdate(
      id,
      remainCourseData,
      {
        new: true,
        runValidators: true,
        session,
      },
    );
    if (!updatedBasicCourseData) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'Failed to update basic course data',
      );
    }
    // if (!preRequisiteCourse) {
    //   const setEnptyPreRequisiteCourse = await CourseModel.findByIdAndUpdate(
    //     id,
    //     {
    //       $set: {
    //         preRequisiteCourse: []
    //       },
    //     },
    //     {
    //       new: true,
    //       session,
    //     },
    //   );
    // }
    if (preRequisiteCourse && preRequisiteCourse.length > 0) {
      const deletePreRequisiteCourse = preRequisiteCourse
        .filter((el) => el.course && el.isDeleted)
        .map((ele) => ele.course);

      const deleteCourse = await CourseModel.findByIdAndUpdate(
        id,
        {
          $pull: {
            preRequisiteCourse: { course: { $in: deletePreRequisiteCourse } },
          },
        },
        {
          new: true,
          session,
        },
      );
      if (!deleteCourse) {
        throw new AppError(
          httpStatus.BAD_REQUEST,
          'Failed to delete Pre Requisite Course data',
        );
      }
      const newPreRequisites = preRequisiteCourse.filter((ele) => ele.course && !ele.isDeleted);
      console.log({ newPreRequisites });

      const updatePreRequisiteCourse = await CourseModel.findByIdAndUpdate(
        id,
        {
          $addToSet: {
            preRequisiteCourse: { $each: newPreRequisites },
          },
        },
        {
          new: true,
          runValidators: true,
          session,
        },
      );

      if (!updatePreRequisiteCourse) {
        throw new AppError(
          httpStatus.BAD_REQUEST,
          'Failed to update Pre Requisite Course  data',
        );
      }
    }
    await session.commitTransaction();
    await session.endSession();

    const result = await CourseModel.findById(id);
    return result;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, `${(error as Error).message}`);
  }
};

const getSingleCourseFromDB = async (courseId: string) => {
  const result = await CourseModel.findById(courseId);
  return result;
};

const deleteSingleCourseFromDB = async (courseId: string) => {
  console.log(courseId);
  const result = await CourseModel.findByIdAndUpdate(
    { _id: courseId },
    { isDeleted: false },
  );

  return result;
};

const assignCourseFacultyInDB = async (
  id: string,
  payload: Partial<TCourseFaculty>,
) => {
  const result = await CourseFacultyModel.findByIdAndUpdate(
    id,
    { course: id, $addToSet: { faculties: { $each: payload } } },
    { upsert: true, new: true },
  );
  return result;
};

const removeCourseFacultyFromDB = async (
  id: string,
  payload: Partial<TCourseFaculty>,
) => {
  const result = await CourseFacultyModel.findByIdAndUpdate(
    id,
    { course: id, $pull: { faculties: { $in: payload } } },
    { upsert: true, new: true },
  );
  return result;
};

export const courseServices = {
  createCourseInDB,
  getAllCoursesFromDB,
  updateSpecificCourseInDB,
  getSingleCourseFromDB,
  deleteSingleCourseFromDB,
  assignCourseFacultyInDB,
  removeCourseFacultyFromDB,
};
