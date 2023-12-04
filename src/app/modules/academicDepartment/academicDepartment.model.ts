import { Schema, model } from 'mongoose';
import { TAcademicDepartment } from './academicDepartment.interface';

const academicDepartmentSchema = new Schema<TAcademicDepartment>(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      unique: true,
    },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      required: [true, 'academic faculty must be required'],
      ref: 'AcademicFaculty',
    },
  },
  { timestamps: true },
);

// academicDepartmentSchema.pre('save', async function (next) {
//   const isExistDepartment = await AcademicDepartmentModel.findOne({
//     name: this.name,
//   });
//   if (isExistDepartment) {
//     throw new Error('Department already exists');
//   }
//   next();
// });

academicDepartmentSchema.pre('findOneAndUpdate', async function (next) {
  const query = this.getQuery();
  const isExistDepartment = await AcademicDepartmentModel.findOne(query);
  if (!isExistDepartment) {
    throw new Error('Department Not Found');
  }
  next();
});

export const AcademicDepartmentModel = model<TAcademicDepartment>(
  'AcademicDepartment',
  academicDepartmentSchema,
);
