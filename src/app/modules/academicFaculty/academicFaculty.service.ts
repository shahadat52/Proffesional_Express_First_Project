import { TAcademicFaculty } from './academicFaculty.interface';
import { AcademicFacultyModel } from './academicFaculty.model';

const createAcademicFacultyInDb = async (
  payload: Partial<TAcademicFaculty>,
) => {
  const result = await AcademicFacultyModel.create(payload);
  return result;
};

const getAllAcademicFacultiesInDb = async() => {
  const result = await AcademicFacultyModel.find();
  return result;
};

export const academicFacultiesServices = {
  createAcademicFacultyInDb,
  getAllAcademicFacultiesInDb,
};
