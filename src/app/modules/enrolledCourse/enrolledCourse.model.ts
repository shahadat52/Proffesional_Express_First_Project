import { Schema, model } from 'mongoose';
import { TEnrolledCourse } from './enrolledCourse.controller';

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
  isEnrolled: { type: Boolean, required: true },
  courseMarks: {
    classTest1: { type: Number, required: true },
    midTerm: { type: Number, required: true },
    classTest2: { type: Number, required: true },
    final: { type: Number, required: true },
  },
  grade: {
    type: String,
    enum: ['A', 'B', 'C', 'D', 'F', 'NA'],
    required: true,
  },
  gradePoints: { type: Number, required: true },
  isCompleted: { type: Boolean, required: true },
});

export const EnrolledCourseModel = model<TEnrolledCourse>(
  'EnrolledCourse',
  enrolledCourseSchema,
);
