import { TAcademicSemester } from '../academicSemester/academicSemester.interface.';
import { UserModel } from './user.model';
const findLastStudentID = async () => {
  const lastStudentId = await UserModel.findOne(
    { role: 'student' },
    { id: 1, _id: 0 },
  )
    .sort({ createAt: -1 })
    .lean();
  return lastStudentId?.id ? lastStudentId?.id.substring(6) : undefined;
};

const generateStudentID = async (payload: TAcademicSemester) => {
  const currentId = (await findLastStudentID()) || (0).toString();
  let incrementId = (Number(currentId) +1).toString().padStart(4, '0');
  incrementId = `${payload.year}${payload.code}${incrementId}`;

  return incrementId;
};

export default generateStudentID;
