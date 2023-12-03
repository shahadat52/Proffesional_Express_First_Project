import { Schema, model } from 'mongoose';
import { TAcademicFaculty } from './academicFaculty.interface';

const academicFacultySchema = new Schema<TAcademicFaculty>(
  {
    name: {
      type: String,
      required: true,
      // unique: true,
    },
  },
  { timestamps: true },
);

academicFacultySchema.pre('save', async function (next) {
  const isFacultyExists = await AcademicFacultyModel.findOne({name: this.name});
  if (isFacultyExists) {
    throw new Error('Faculty already created');
  }
  next();
});

academicFacultySchema.pre('findOneAndUpdate', async function (next) {
  const query = this.getQuery();
  const isExistDepartment = await AcademicFacultyModel.findOne(query);
  if (!isExistDepartment) {
    throw new Error('Faculty Not Found');
  }
  next();
});
export const AcademicFacultyModel = model<TAcademicFaculty>(
  'AcademicFaculty',
  academicFacultySchema,
);
