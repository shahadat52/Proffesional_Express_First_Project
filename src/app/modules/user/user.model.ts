import { Schema, model } from 'mongoose';
import { TUser, TUserModel } from './user.interface';
import config from '../../config';
import bcrypt from 'bcrypt';

const UserSchema = new Schema<TUser, TUserModel>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: [true, 'email is required'],
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: 0,
    },
    passwordChangeTime: {
      type: Date,
      required: false,
    },
    needsPasswordChange: {
      type: Boolean,
      default: true,
    },
    status: {
      type: String,
      enum: ['in-progress', 'blocked'],
    },
    role: {
      type: String,
      enum: ['super-admin','student', 'faculty', 'admin'],
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

//make password hashing
UserSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  user.password = await bcrypt.hash(user.password, Number(config.bcrypt_salt));
  next();
});

UserSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});

UserSchema.statics.isUserExists = async function (id: string) {
  return await UserModel.findOne({ id });
};

UserSchema.statics.isPasswordMatch = async function (
  planePassword,
  hashPassword,
) {
  return await bcrypt.compare(planePassword, hashPassword as string);
};

UserSchema.statics.isPasswordChangeAfterTokenIssue = function (
  passwordChangeTime,
  tokenIssueTime,
) {
  const changeTime = new Date(passwordChangeTime).getTime() / 1000;
  return changeTime > tokenIssueTime;
};
export const UserModel = model<TUser, TUserModel>('User', UserSchema);
