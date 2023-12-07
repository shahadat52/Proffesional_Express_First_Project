import { TCourse } from './course.interface';
import { CourseModel } from './course.model';

const createCourseInDB = async (payload: TCourse) => {
  const result = await CourseModel.create(payload);
  return result;
};

const getAllCoursesFromDB = async () => {
  const result = await CourseModel.find().populate('preRequisiteCourse.course');
  return result;
};

const getSingleCourseFromDB = async (courseId: string) => {
  const result = await CourseModel.findById(courseId);
  return result;
};

const deleteSingleCourse = async (courseId: string) => {
  const result = await CourseModel.findByIdAndUpdate(
    { _id: courseId },
    { isDeleted: true },
  );

  return result;
};

export const courseServices = {
  createCourseInDB,
  getAllCoursesFromDB,
  getSingleCourseFromDB,
  deleteSingleCourse,
};
