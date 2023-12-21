/* eslint-disable no-unused-vars */
import { Date, Model } from 'mongoose';
import { USER_ROLE } from './user.constant';

export interface TUser {
  id: string;
  password: string;
  needsPasswordChange: boolean;
  passwordChangeTime: Date;
  role: 'student' | 'faculty' | 'admin';
  status: 'in-progress' | 'blocked';
  isDeleted: boolean;
}

export interface TUserModel extends Model<TUser> {
  isUserExists(id: string): Promise<TUser | null>;

  isPasswordMatch(
    planePassword: string,
    hashPassword: string,
  ): Promise<boolean>;

  isPasswordChangeAfterTokenIssue(
    passwordChangeTime: Date,
    iAt: number,
  ): Promise<boolean>;
}

export type TUserRole = keyof typeof USER_ROLE;

// export type TNewUser = {
//     id: string;
//     password: string;
//     role: string;
// }
