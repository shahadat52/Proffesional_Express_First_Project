import express from 'express';
import { userController } from './user.controller';
import validateRequest from '../../middlewares/validateRequest';
import {createStudentValidationSchema} from '../student/student.validation'

const userRouter = express.Router();



userRouter.post('/create-student', validateRequest(createStudentValidationSchema), userController.createStudent);
userRouter.post('/faculties', )

export const userRoutes = userRouter;
