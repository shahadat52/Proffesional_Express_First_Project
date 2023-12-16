import httpStatus from 'http-status';
import AppError from '../../errors/appErrors';
import { TSemesterRegistration } from './semesterRegistration.interface';
import { SemesterRegistrationModel } from './semesterRegistration.model';
import { AcademicSemesterModel } from '../academicSemester/academicSemester.model';
import QueryBuilder from '../../builder/QueryBuilder';
import { Status } from './semesterRegistration.constant';

const createSemesterRegistrationInDB = async (
  payload: TSemesterRegistration,
) => {
  // check is there any semester registered for UPCOMING and ONGOING
  const isExistsUpcomingAndOngoingStatus =
    await SemesterRegistrationModel.findOne({
      $or: [{ status: Status.ONGOING }, { status: 'UPCOMING' }],
    });

  if (isExistsUpcomingAndOngoingStatus) {
    throw new AppError(
      httpStatus.ALREADY_REPORTED,
      `${isExistsUpcomingAndOngoingStatus.status} semester is already exists`,
    );
  }
  const academicSemester = payload?.academicSemester;
  const isExistsAcademicSemester =
    await AcademicSemesterModel.findById(academicSemester);
  if (!isExistsAcademicSemester) {
    throw new AppError(
      httpStatus.CONFLICT,
      'Academic semester is not available',
    );
  }

  const isExistsSemesterRegistration =
    await SemesterRegistrationModel.findById(academicSemester);
  if (isExistsSemesterRegistration) {
    throw new AppError(httpStatus.CONFLICT, 'This semester already registered');
  }

  const result = await SemesterRegistrationModel.create(payload);
  return result;
};

const getAllSemesterRegistrationsFromDB = async (
  query: Record<string, unknown>,
) => {
  const semesterRegistrationQuery = new QueryBuilder(
    SemesterRegistrationModel.find(),
    query,
  )
    .filter()
    .sort()
    .pagination()
    .fields();

  const result = await semesterRegistrationQuery.modelQuery;
  return result;
};

const getSingleSemesterRegistrationFromDB = async (id: string) => {
  const result = await SemesterRegistrationModel.findById(id);
  return result;
};

const updateSemesterRegistrationInDB = async (
  id: string,
  payload: Partial<TSemesterRegistration>,
) => {
  const currentSemesterRegistration =
    await SemesterRegistrationModel.findById(id);
  const status = currentSemesterRegistration?.status;
  if (!currentSemesterRegistration) {
    throw new AppError(httpStatus.NOT_FOUND, `Requested semester not found`);
  }
  if (status === Status.ENDED) {
    throw new AppError(
      httpStatus.ALREADY_REPORTED,
      `Can't change status after become status ${status} `,
    );
  }
  //UPCOMING ====> ONGOING ====> ENDED
  if (
    currentSemesterRegistration.status === Status.UPCOMING &&
    payload.status === Status.ENDED
  ) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `You can not directly change status from ${Status.UPCOMING} to ${payload.status}`,
    );
  }
  if (
    currentSemesterRegistration.status === Status.ONGOING &&
    payload.status === Status.UPCOMING
  ) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `You can not directly change status from ${Status.ONGOING} to ${payload.status}`,
    );
  }

  const result = await SemesterRegistrationModel.findByIdAndUpdate(
    id,
    payload,
    { new: true },
  );
  return result;
};

export const semesterRegistrationServices = {
  createSemesterRegistrationInDB,
  getAllSemesterRegistrationsFromDB,
  getSingleSemesterRegistrationFromDB,
  updateSemesterRegistrationInDB,
};
