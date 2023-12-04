import { Schema, model } from 'mongoose';
import { TGuardian, TName, TStudent, StudentModel } from './student.interface';

const studentNameSchema = new Schema<TName>({
  firstName: {
    type: String,
    required: [true, 'first name is required'],
    maxlength: [20, 'FirstName allowed only 20 charectar'],
  },
  middleName: { type: String },
  lastName: {
    type: String,
  },
});

const guardianSchema = new Schema<TGuardian>({
  fatherName: { type: String, required: true, trim: true },
  fatherOccupation: { type: String, required: true, trim: true },
  fatherContactNo: { type: String, required: true, trim: true },
  motherName: { type: String, required: true, trim: true },
  motherOccupation: { type: String, required: true, trim: true },
  motherContactNo: { type: String, required: true, trim: true },
});

const localGuardianSchema = new Schema({
  name: { type: String, required: true, trim: true },
  occupation: { type: String, required: true, trim: true },
  contactNo: { type: String, required: true, trim: true },
  address: { type: String, required: true, trim: true },
});

// create student schema
const studentSchema = new Schema<TStudent, StudentModel>(
  {
    id: {
      type: String,
      unique: true,
      required: [true, 'Student ID is required'],
    },
    user: {
      type: Schema.Types.ObjectId,
      required: [true, 'User must be required'],
      unique: true,
      ref: 'User',
    },
    password: {
      type: String,
      maxlength: [20, 'Password not allow more then 20 characters'],
    },
    name: {
      type: studentNameSchema,
      required: [true, 'Student Name is required'],
    },
    gender: {
      type: String,
      enum: {
        values: ['male', 'female'],
        message: '{VALUE} is not supported',
      },
      required: true,
    },
    dateOfBirth: { type: Date, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    contactNo: { type: String, required: true, trim: true },
    emergencyContactNo: { type: String, required: true, trim: true },
    bloodGroup: {
      type: String,
      enum: {
        values: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
        message: 'Please enter a valid blood group',
      },
    },
    presentAddress: { type: String, required: true },
    permanentAddress: { type: String, required: true },
    guardian: {
      type: guardianSchema,
      required: [true, 'Guardian Details are required'],
    },
    localGuardian: {
      type: localGuardianSchema,
      required: [true, 'Local Guardian details are required'],
    },
    profileImage: { type: String, required: true },
    admissionSemester: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicSemester',
    },
    academicDepartment: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicDepartment',
    },

    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true },
);

studentSchema.set('toJSON', { virtuals: true });

studentSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

studentSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});
// [ { '$match': {} },  ]
studentSchema.pre('aggregate', function (next) {
  // console.log(this.pipeline());
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

studentSchema.virtual('fullname').get(function () {
  return `${this.name.firstName} ${this.name.middleName} ${this.name.lastName}`;
});
// create static method for check user exists
studentSchema.statics.isUserExists = async function (id: string) {
  const exists = await Student.findOne({ id });
  console.log(exists);
  return exists;
};

// create a model
export const Student = model<TStudent, StudentModel>('Student', studentSchema);
