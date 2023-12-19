import { Schema, model } from 'mongoose';
import { TFaculty, TFacultyName } from './faculty.interface';

const facultyName = new Schema<TFacultyName>({
  firstName: String,
  lastName: String,
  middleName: String,
});
const facultySchema = new Schema<TFaculty>(
  {
    id: {
      type: String,
      unique: true,
      trim: true,
      required: [true, 'Faculty id must be required'],
    },
    name: {
      type: facultyName,
      required: [true, 'Name must be required'],
    },

    user: {
      type: Schema.Types.ObjectId,
      trim: true,
      required: [true, 'User must be required'],
    },
    designation: {
      type: String,
      required: [true, 'Designation must be required'],
    },
    gender: {
      type: String,
      required: true,
      enum: {
        values: ['male', 'female', 'other'],
        message: '{VALUE} is not supported',
      },
    },
    dateOfBirth: {
      type: String,
      required: [true, 'Date of birth must be required'],
    },
    email: {
      type: String,
      unique: true,
      trim: true,
      required: [true, 'Email must be required'],
    },
    contractNo: {
      type: String,
      required: [true, 'Contract No must be required'],
    },
    emergencyContract: {
      type: String,
      required: [true, 'Emergency Contract No must be required'],
    },
    bloodGroup: {
      type: String,
      enum: {
        values: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
        message: '{VALUE} is not supported',
      },
      required: false,
    },
    presentAddress: {
      type: String,
      required: [true, 'Present Address must be required'],
    },
    permanentAddress: {
      type: String,
      required: [true, 'Permanent Address must be required'],
    },
    academicDepartment: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'AcademicDepartment',
    },
  },
  { timestamps: true },
);

export const FacultyModel = model('Faculty', facultySchema);
