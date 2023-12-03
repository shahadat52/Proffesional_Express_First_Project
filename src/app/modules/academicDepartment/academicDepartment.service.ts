import { TAcademicDepartment } from './academicDepartment.interface';
import { AcademicDepartmentModel } from './academicDepartment.model';

// Create academic department
const createAcademicDepartmentInDB = async (payload: TAcademicDepartment) => {
  const result = await AcademicDepartmentModel.create(payload);
  return result;
};

// Get all academic departments
const getAllAcademicDepartmentInDB = async () => {
  const result = await AcademicDepartmentModel.find();
  return result;
};

// Get single academic departments
const getSingleAcademicDepartmentFromDB = async (id: string) => {
  const result = await AcademicDepartmentModel.findOne({ _id: id }).populate('academicFaculty');
  return result;
};

const updateAcademicDepartmentInDB = async (
  id: string,
  updateData: Partial<TAcademicDepartment>,
) => {
  const result = await AcademicDepartmentModel.findOneAndUpdate(
    { _id: id },
    { $set: { name: updateData.name } },
  );

  return result;
};

export const academicDepartmentServices = {
  createAcademicDepartmentInDB,
  getAllAcademicDepartmentInDB,
  getSingleAcademicDepartmentFromDB,
  updateAcademicDepartmentInDB,
};
