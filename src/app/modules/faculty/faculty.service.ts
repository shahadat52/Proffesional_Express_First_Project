import { FacultyModel } from './faculty.model';

const getAllFacultiesFromDB = async () => {
  const result = await FacultyModel.find();
  return result;
};

export const facultyServices = {
  getAllFacultiesFromDB,
};
