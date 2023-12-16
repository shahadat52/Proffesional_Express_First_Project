import { Schema, model } from 'mongoose';
import { TSemesterRegistration } from './semesterRegistration.interface';

const semesterRegistrationSchema = new Schema<TSemesterRegistration>({
  academicSemester: {
    type: Schema.Types.ObjectId,
    unique: true,
    required: [true, 'academicSemester is must be required'],
  },
  status: {
    type: String,
    enum: ['UPCOMING', 'ONGOING', 'ENDED'],
    message: '{VALUE} is not not correct'
  },
  startDate: {
    type: Date,
    required: [true, 'Start date is must be required']
  },
  endDate: {
    type: Date,
    required: [true, 'End date is must be required']
  },
  minCredit: {
    type: Number,
    required: [true, 'minCredit is must be required']
  },
  maxCredit: {
    type: Number,
    required: [true, 'maxCredit is must be required']
  }
}, {timestamps: true});

export const SemesterRegistrationModel = model<TSemesterRegistration>(
  'semesterRegistration', semesterRegistrationSchema
);
