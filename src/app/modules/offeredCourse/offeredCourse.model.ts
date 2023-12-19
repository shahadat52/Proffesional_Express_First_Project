import { Schema, model } from 'mongoose';
import { TOfferedCourse } from './offeredCourse.interface';
import { Days } from './offeredCourse.constant';

const offeredCourseSchema = new Schema<TOfferedCourse>({
  semesterRegistration: {
    type: Schema.Types.ObjectId,
    required: [true, 'Semester Registration is required'],
    ref: 'semesterRegistration',
  },
  academicSemester: {
    type: Schema.Types.ObjectId,
    required: [true, 'Academic semester is required'],
    ref: 'AcademicSemester',
  },
  academicFaculty: {
    type: Schema.Types.ObjectId,
    required: [true, 'Academic faculty is required'],
    ref: 'AcademicFaculty',
  },
  academicDepartment: {
    type: Schema.Types.ObjectId,
    required: [true, 'Academic department is required'],
    ref: 'AcademicDepartment',
  },
  course: {
    type: Schema.Types.ObjectId,
    required: [true, 'Course is required'],
    ref: 'Course',
  },
  faculty: {
    type: Schema.Types.ObjectId,
    required: [true, 'Faculty is required'],
    ref: 'Faculty',
  },
  maxCapacity: {
    type: Number,
    required: [true, 'max capacity is required'],
  },
  section: {
    type: Number,
    required: [true, 'Section is required'],
  },
  days: [
    {
      type: String,
      enum: Days,
    },
  ],
  startTime: {
    type: String,
    required: true,
  },
  endTime: {
    type: String,
    required: true,
  },
});

export const OfferedCourseModel = model<TOfferedCourse>(
  'OfferedCourse',
  offeredCourseSchema,
);
