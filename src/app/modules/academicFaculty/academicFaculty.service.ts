import { TAcademicFaculty } from './academicFaculty.interface';
import { AcademicFacultyModel } from './academicFaculty.model';

const createAcademicFacultyInDB = async (
  payload: Partial<TAcademicFaculty>,
) => {
  const result = await AcademicFacultyModel.create(payload);
  return result;
};

const getAllAcademicFacultiesInDB = async () => {
  const result = await AcademicFacultyModel.find();
  return result;
};

// Get specific faculty data
const getSingleAcademicFacultyInDB = async (facultyId: string) => {
  const result = await AcademicFacultyModel.findOne({ _id: facultyId });
  return result;
};

// Update specific academic faculty
const updateSingleAcademicFacultyInDB = async (
  facultyId: string,
  updateFacultyData: Partial<TAcademicFaculty>,
) => {
  const result = await AcademicFacultyModel.updateOne(
    { _id: facultyId },
    { $set: { name: updateFacultyData.name } },
  );

  return result;
};
export const academicFacultiesServices = {
  createAcademicFacultyInDb: createAcademicFacultyInDB,
  getAllAcademicFacultiesInDb: getAllAcademicFacultiesInDB,
  getSingleAcademicFacultyInDB,
  updateSingleAcademicFacultyInDB,
};
