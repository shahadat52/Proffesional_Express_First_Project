import { semesterNameAndCodeMapper } from './academicSemester.constant';
import { TAcademicSemester } from './academicSemester.interface.';
import { AcademicSemesterModel } from './academicSemester.model';

//Semester Create
const createAcademicSemesterInDB = async (payload: TAcademicSemester) => {
  // check for aline of semester name and code
  if (semesterNameAndCodeMapper[payload.name] !== payload.code) {
    // throw new Error('Invalid semester code');
  }
  const result = await AcademicSemesterModel.create(payload);
  return result;
};

//Get all semester
const getAllSemesterFromDB = async () => {
  const result = await AcademicSemesterModel.find();
  return result;
};

//Get single semester
const getSingleSemesterFromDB = async (id: string) => {
  const result = await AcademicSemesterModel.findOne({ _id: id });
  return result;
};

// update specific semester data
const updateSingleSemesterInDB = async (
  id: string,
  payload: Partial<TAcademicSemester>,
) => {
  if (
    payload.name &&
    payload.code &&
    semesterNameAndCodeMapper[payload.name] !== payload.code
  ) {
    throw new Error('Invalid Semester Code');
  }

  const result = await AcademicSemesterModel.updateOne(
    { _id: id },
    { $set: { name: payload.name } },
  );
  return result;
};

export const academicSemesterServices = {
  createAcademicSemesterInDB,
  getAllSemesterFromDB,
  getSingleSemesterFromDB,
  updateSingleSemesterInDB,
};
