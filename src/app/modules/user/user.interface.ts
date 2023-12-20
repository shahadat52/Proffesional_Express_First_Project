import { Model } from "mongoose";


export interface TUser  {
  id: string;
  password: string;
  needsPasswordChange: boolean;
  role: 'student' | 'faculty' | 'admin';
  status: 'in-progress' | 'blocked';
  isDeleted: boolean;
};

export interface TUserModel extends Model<TUser> {
  isUserExists(id: string): Promise<TUser | null>;
}

// export type TNewUser = {
//     id: string;
//     password: string;
//     role: string;
// }
