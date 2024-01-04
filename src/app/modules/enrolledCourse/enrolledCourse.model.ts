import { Schema, model } from 'mongoose';
import { TEnrolledCourse } from './enrolledCourse.interface';

const courseMarksSchema = new Schema(
  {
    classTest1: {
      type: Number,
      default: 0,
    },
    midTerm: {
      type: Number,
      default: 0,
    },
    classTest2: {
      type: Number,
      default: 0,
    },
    final: {
      type: Number,
      default: 0,
    },
  },
  {
    _id: false,
  },
);

const enrolledCourseSchema = new Schema<TEnrolledCourse>({
  semesterRegistration: {
    type: Schema.Types.ObjectId,
    required: [true, 'Semester Registration is Required'],
    ref: 'SemesterRegistration',
  },
  academicSemester: {
    type: Schema.Types.ObjectId,
    required: [true, ' Academic semester is Required'],
    ref: 'AcademicSemester',
  },
  academicDepartment: {
    type: Schema.Types.ObjectId,
    required: [true, 'Academic Department is Required'],
    ref: 'AcademicDepartment',
  },
  offeredCourse: {
    type: Schema.Types.ObjectId,
    required: [true, 'Offered course is Required'],
    ref: 'OfferedCourse',
  },
  course: {
    type: Schema.Types.ObjectId,
    required: [true, 'Course is Required'],
    ref: 'Course',
  },
  student: {
    type: Schema.Types.ObjectId,
    required: [true, 'Student is Required'],
    ref: 'Student',
  },
  faculty: {
    type: Schema.Types.ObjectId,
    required: [true, 'Faculty is Required'],
    ref: 'Faculty',
  },
  isEnrolled: { type: Boolean, default: false },
  courseMarks: {
    type:courseMarksSchema,
    default: {}
  },
  grade: {
    type: String,
    enum: ['A', 'B', 'C', 'D', 'F', 'NA'],
    default: 'NA',
    required: true,
  },
  gradePoints: {
    type: Number,
    max: 4,
    min: 0,
    default: 0,
  },
  isCompleted: { type: Boolean, default: false },
});

export const EnrolledCourseModel = model<TEnrolledCourse>(
  'EnrolledCourse',
  enrolledCourseSchema,
);
