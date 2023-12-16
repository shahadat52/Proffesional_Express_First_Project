import mongoose from 'mongoose';
import { Student } from './student.model';
import { UserModel } from '../user/user.model';
import { TStudent } from './student.interface';
import QueryBuilder from '../../builder/QueryBuilder';
import { studentSearchableFields } from './student.constant';

//service will query in DB

const getAllStudentFromDb = async ( query: Record<string, unknown>) => {
  // const queryObj = { ...query };

  // // {email: {$regex: query, $options:'i'}}
  // let searchTerm = '';
  // if (query?.searchTerm) {
  //   searchTerm = query.searchTerm as string;
  // }

  // const excludeSearchTerm = ['searchTerm', 'sort', 'page', 'limit', 'fields'];
  // excludeSearchTerm.forEach((ele) => delete queryObj[ele]);
  // // copyQuery.forEach(element => delete element[excludeSearchTerm]);

  // const searchQuery = Student.find({
  //   $or: ['email', 'address', 'name.middleName', 'page', 'limit',].map(
  //     (field) => ({
  //       [field]: { $regex: searchTerm, $options: 'i' },
  //     }),
  //   ),
  // });
  // console.log('queryObj', queryObj);

  // const filterQuery = searchQuery.find(queryObj);
  // // .populate()
  // // .populate('academicDepartment');
  // let sort = '-createdAt';

  // if (query.sort) {
  //   sort = query.sort as string;
  // }

  // const sortQuery = filterQuery.sort(sort);

  // let limit = 1;
  // if (query.limit) {
  //   limit = Number(query.limit);
  // }

  // let page = 1;
  // let skip = 0;
  // if (query.limit) {
  //   limit = Number(query.limit);
  // }
  // if (query.page) {
  //   page = Number(query.page);
  //   skip = (page - 1) * limit;
  // }

  // const paginationQuery = sortQuery.skip(skip);
  // // const paginationQuery = sortQuery.skip(skip);
  // // console.log({paginationQuery});
  // const limitQuery =  paginationQuery.limit(limit);

  // let fields = '-_v'
  // // fields= name email
  // if(query.fields){
  //   fields = (query.fields as string).split(',').join(' ')
  //   console.log(fields);
  // }

  // const selectQuery = await limitQuery.select(fields)

  // return selectQuery;

  const studentQuery = new QueryBuilder(Student.find(), query)
    .search(studentSearchableFields)
    .filter()
    .sort()
    .pagination()
    .fields();

  const result = await studentQuery.modelQuery;
  return result;
};
//[ { '$match': { '$ne': '12342445844' } } , { '$match': { '$ne': '12342445844' } } ]
const getSingleStudentFromDb = async (id: string) => {
  const result = await Student.findOne({ id });
  // .populate('user')
  // .populate('admissionSemester')
  // .populate({
  //   path: 'academicDepartment',
  //   populate: { path: 'academicFaculty' },
  // });
  return result;
};

const deleteStudentFromDb = async (id: string) => {
  if (await Student.isUserExists(id)) {
    const session = await mongoose.startSession();
    try {
      session.startTransaction();
      const deletedStudent = await Student.findOneAndUpdate(
        { id: id },
        { isDeleted: true },
        { new: true, session },
      );
      if (!deletedStudent) {
        throw new Error('Failed to delete student');
      }

      const deletedUser = await UserModel.findOneAndUpdate(
        { id: id },
        { isDeleted: true },
        { new: true, session },
      );
      if (!deletedUser) {
        throw new Error('Failed to delete user');
      }

      await session.commitTransaction();
      await session.endSession();

      return deletedStudent;
    } catch (error) {
      await session.abortTransaction();
      await session.endSession();
      throw new Error('operation failed');
    }
  }
  throw new Error('Student Not Found');
};
const updatedStudentInDB = async (id: string, payload: Partial<TStudent>) => {
  const { name, guardian, localGuardian, ...remainingStudentData } = payload;

  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingStudentData,
  };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value;
    }
  }

  if (guardian && Object.keys(guardian).length) {
    for (const [key, value] of Object.entries(guardian)) {
      modifiedUpdatedData[`guardian.${key}`] = value;
    }
  }

  if (localGuardian && Object.keys(localGuardian).length) {
    for (const [key, value] of Object.entries(localGuardian)) {
      modifiedUpdatedData[`localGuardian.${key}`] = value;
    }
  }

  console.log(modifiedUpdatedData);
  const result = await Student.updateOne({ id }, modifiedUpdatedData, {
    new: true,
    runValidators: true,
  });
  return result;
};

export const StudentService = {
  getAllStudentFromDb,
  getSingleStudentFromDb,
  deleteStudentFromDb,
  updatedStudentInDB,
};
