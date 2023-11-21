import { Schema, model } from 'mongoose';
import { TGuardian, TName, TStudent, StudentModel } from './student.interface';
import bcrypt from 'bcrypt';
import config from '../config';
// import { boolean, required } from 'joi';
// import validator from 'validator';

const studentNameSchema = new Schema<TName>({
  firstName: {
    type: String,
    required: true,
    maxlength: [20, 'FirstName allowed only 20 charectar'],
    // trim: true,
    // validate: {
    //   validator: function (value: string) {
    //     const firstLetter = value.charAt(0);
    //     if (firstLetter === firstLetter.toUpperCase()) {
    //       return true;
    //     } else {
    //       return false;
    //     }
    //   },
    //   message: '{VALUE} is not capitalize function',
    // },
  },
  middleName: { type: String },
  lastName: {
    type: String,
    // required: true,
    // trim: true,
    //   validate: {
    //     validator: (value: string) => validator.isAlpha(value),
    //   },
    //   message: '{VALUE}Allows only letter',
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
const studentSchema = new Schema<TStudent, StudentModel>({
  id: {
    type: String,
    unique: true,
    required: [true, 'Student ID is required'],
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
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
  dateOfBirth: { type: String, trim: true },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    // validate: {
    //   validator: (value: string) => validator.isEmail(value),
    //   message: '{VALUE} is not valid email',
    // },
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
  isActive: {
    type: String,
    enum: {
      values: ['active', 'block'],
      default: 'active',
    },
  },
  isDeleted: { type: Boolean, default: false },
  maritalStatus: { type: Boolean, default: false },
});

studentSchema.set('toJSON', { virtuals: true });

studentSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  user.password = await bcrypt.hash(user.password, Number(config.bcrypt_salt));
  next();
});

studentSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});

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
  console.log(this);
  return `${this.name.firstName} ${this.name.middleName} ${this.name.lastName}`;
});
// create static method
studentSchema.statics.isUserExists = async function (id: string) {
  const exists = await Student.findOne({ id });
  return exists;
};
// studentSchema.static('id', function isUserExists(id) {
//   const exists = Student.findOne({ id });
//   return exists;
// });

//create method on Schema
// studentSchema.methods.isUserExists = async function (id: string) {
//   const existingStudent = await Student.findOne({ id });
//   return existingStudent;
// };
// create a model
export const Student = model<TStudent, StudentModel>('Student', studentSchema);
