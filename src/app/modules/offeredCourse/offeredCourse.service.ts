import httpStatus from 'http-status';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/appErrors';
import { SemesterRegistrationModel } from '../semesterRegistration/semesterRegistration.model';
import { TOfferedCourse } from './offeredCourse.interface';
import { OfferedCourseModel } from './offeredCourse.model';
import { AcademicFacultyModel } from '../academicFaculty/academicFaculty.model';
import { AcademicDepartmentModel } from '../academicDepartment/academicDepartment.model';
import { hasAvailableSchedules } from './offeredCourse.utils';
import { FacultyModel } from '../faculty/faculty.model';

const createOfferedCourseInDB = async (payload: TOfferedCourse) => {
  /**
   * Step 1: check if the semester registration id is exists!
   * Step 2: check if the academic faculty id is exists!
   * Step 3: check if the academic department id is exists!
   * Step 4: check if the course id is exists!
   * Step 5: check if the faculty id is exists!
   * Step 6: check if the department is belong to the  faculty
   * Step 7: check if the same offered course same section in same registered semester exists
   * Step 8: get the schedules of the faculties
   * Step 9: check if the faculty is available at that time. If not then throw error
   * Step 10: create the offered course
   */
  const {
    semesterRegistration,
    academicDepartment,
    academicFaculty,
    course,
    faculty,
    section,
    days,
    startTime,
    endTime,
  } = payload;
  const isExistsSemesterRegistration =
    await SemesterRegistrationModel.findById(semesterRegistration);
  const isAcademicDepartmentExists =
    await AcademicDepartmentModel.findById(academicDepartment);

  const isAcademicFacultyExists =
    await AcademicFacultyModel.findById(academicFaculty);
  if (!isExistsSemesterRegistration) {
    throw new AppError(httpStatus.NOT_FOUND, 'Semester registration not found');
  }
  if (!academicDepartment) {
    throw new AppError(httpStatus.NOT_FOUND, 'Academic Department not found');
  }
  if (!academicFaculty) {
    throw new AppError(httpStatus.NOT_FOUND, 'Academic faculty not found');
  }
  if (!course) {
    throw new AppError(httpStatus.NOT_FOUND, 'Course not found');
  }
  if (!faculty) {
    throw new AppError(httpStatus.NOT_FOUND, 'Faculty not found');
  }

  const isDepartmentBelongToFaculty = await AcademicDepartmentModel.findOne({
    _id: academicDepartment,
    academicFaculty,
  });
  if (!isDepartmentBelongToFaculty) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      `${isAcademicDepartmentExists?.name} not belong in the faculty of ${isAcademicFacultyExists?.name}`,
    );
  }

  const isExistSameSectionCourseSemesterRegistration =
    await OfferedCourseModel.findOne({
      semesterRegistration,
      section,
      course,
    });

  // Step 7: check if the same offered course same section in same registered semester exists
  if (isExistSameSectionCourseSemesterRegistration) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'This offered course already exists for this section',
    );
  }

  // get the schedules of the faculties
  const assignedSchedules = await OfferedCourseModel.find(
    {
      semesterRegistration,
      faculty,
      days: { $in: days },
    },
    { days, startTime, endTime },
  );

  const newSchedule = {
    days,
    startTime,
    endTime,
  };

  // for (const schedule of assignedSchedules) {
  //   const existingStartTime = new Date(`1970-01-01T${schedule.startTime}`);
  //   const existingEndTime = new Date(`1970-01-01T${schedule.endTime}`);
  //   const newStartTime = new Date(`1970-01-01T${newSchedule.startTime}`);
  //   const newEndTime = new Date(`1970-01-01T${newSchedule.endTime}`);

  //   if (newStartTime > existingEndTime && newEndTime > existingStartTime) {
  //     return true;
  //   }
  //   return false;
  // }
  if (hasAvailableSchedules(assignedSchedules, newSchedule)) {
    throw new AppError(
      httpStatus.CONFLICT,
      `This faculty is not available at that time ! Choose other time or day`,
    );
  }
  const academicSemester = isExistsSemesterRegistration.academicSemester;
  const result = await OfferedCourseModel.create({
    ...payload,
    academicSemester,
  });
  return result;
  // return null;
};

const updateOfferedCourseInDB = async (
  id: string,
  payload: Pick<TOfferedCourse, 'faculty' | 'days' | 'startTime' | 'endTime'>,
) => {
  /**
   * Step 1: check if the offered course exists
   * Step 2: check if the faculty exists
   * Step 3: check if the semester registration status is upcoming
   * Step 4: check if the faculty is available at that time. If not then throw error
   * Step 5: update the offered course
   */
  const { faculty, days, startTime, endTime } = payload;
  const isOfferedCourseExists = await OfferedCourseModel.findById(id);
  if (!isOfferedCourseExists) {
    throw new AppError(httpStatus.NOT_FOUND, `This Offered is not found`);
  }

  const isExistsFaculty = await FacultyModel.findById(faculty);

  if (!isExistsFaculty) {
    throw new AppError(httpStatus.NOT_FOUND, `This faculty is not found`);
  }

  const semesterRegistration = isOfferedCourseExists?.semesterRegistration;

  const isExistsSemesterRegistration =
    await SemesterRegistrationModel.findById(semesterRegistration);
  if (isExistsSemesterRegistration?.status !== 'UPCOMING') {
    throw new AppError(
      httpStatus.NOT_FOUND,
      `Semester registration must be UPCOMING`,
    );
  }

  const assignedSchedules = await OfferedCourseModel.find({
    semesterRegistration,
    faculty,
    days: { $in: days },
  }).select('days startTime endTime');

  const newSchedule = {
    days,
    startTime,
    endTime,
  };

  if (hasAvailableSchedules(assignedSchedules, newSchedule)) {
    throw new AppError(
      httpStatus.CONFLICT,
      `This faculty is not available at that time ! Choose other time or day`,
    );
  }
  const result = await OfferedCourseModel.findByIdAndUpdate(id, payload);
  return result;
};

const getAllOfferedCourseFromDB = async (query: Record<string, unknown>) => {
  const semesterRegistrationQuery = new QueryBuilder(
    OfferedCourseModel.find()
      .populate('semesterRegistration')
      .populate('academicSemester')
      .populate('academicFaculty')
      .populate('academicDepartment')
      .populate('course')
      .populate('faculty'),
    query,
  )
    .filter()
    .sort()
    .pagination()
    .fields();

  const result = await semesterRegistrationQuery.modelQuery;
  return result;
};
export const offeredCourseServices = {
  createOfferedCourseInDB,
  getAllOfferedCourseFromDB,
  updateOfferedCourseInDB,
};
