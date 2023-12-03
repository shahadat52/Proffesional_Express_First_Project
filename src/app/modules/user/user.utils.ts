import { TAcademicSemester } from '../academicSemester/academicSemester.interface.';
import { UserModel } from './user.model';
const findLastStudentID = async () => {
  const lastStudentId = await UserModel.findOne(
    { role: 'student' },
    { id: 1, _id: 0 },
  )
    .sort({ createdAt: -1 })
    .lean();
  return lastStudentId?.id ? lastStudentId.id : undefined;

};

const generateStudentID = async (payload: TAcademicSemester) => {
  let currentId = (0).toString();
  const lastStudentId = await findLastStudentID();
  // // 2030 01 0001
  // const lastStudentSemesterCode = lastStudentId?.substring(4, 6); //01;
  // const lastStudentYear = lastStudentId?.substring(0, 4); // 2030
  // const currentSemesterCode = payload.code;
  // const currentYear = payload.year;

  //2030  01  0001
  // const lastStudentId = await findLastStudentID();
  const lastStudentYear = lastStudentId?.substring(0, 4); //2030
  const lastStudentCode = lastStudentId?.substring(4, 6); //01

  const currentYear = payload.year;
  const currentCode = payload.code;

  if (
    lastStudentId &&
    lastStudentYear === currentYear &&
    lastStudentCode === currentCode
  ) {
    currentId = lastStudentId.substring(6);
    console.log('ahh', currentId);
  }

  let incrementId =  (Number(currentId) + 1).toString().padStart(4, '0');
  incrementId = `${payload.year}${payload.code}${incrementId}`;

  return incrementId;
};

export default generateStudentID;
