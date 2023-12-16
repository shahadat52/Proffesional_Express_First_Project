import { Types } from 'mongoose';

export type TFacultyName = {
  firstName: string;
  middleName: string;
  lastName: string;
};
export type TFaculty = {
  id: string;
  role: string;
  name: TFacultyName;
  user: Types.ObjectId;
  designation: string;
  gender: 'male' | 'female' | 'other';
  dateOfBirth: string;
  email: string;
  contractNo: string;
  emergencyContract: string;
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  presentAddress: string;
  permanentAddress: string;
  academicDepartment: Types.ObjectId;
  academicFaculty: Types.ObjectId;
};
