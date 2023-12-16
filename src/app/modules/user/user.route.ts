import express from 'express';
import { userController } from './user.controller';
import validateRequest from '../../middlewares/validateRequest';
import { createStudentValidationSchema } from '../student/student.validation';
import { facultyValidation } from '../faculty/faculty.validation';

const userRouter = express.Router();

userRouter.post(
  '/create-student',
  validateRequest(createStudentValidationSchema),
  userController.createStudent,
);
userRouter.post(
  '/create-faculty',
  validateRequest(facultyValidation.facultyValidationSchema),
  userController.createFaculty,
);

export const userRoutes = userRouter;
