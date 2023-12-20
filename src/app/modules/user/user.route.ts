import express from 'express';
import { userController } from './user.controller';
import validateRequest from '../../middlewares/validateRequest';
import { createStudentValidationSchema } from '../student/student.validation';
import { facultyValidation } from '../faculty/faculty.validation';
import { AdminValidations } from '../admin/admin.validation';
import auth from '../../middlewares/auth';
import { USER_ROLE } from './user.constant';

const router = express.Router();

router.post(
  '/create-student',
  auth(USER_ROLE.admin),
  validateRequest(createStudentValidationSchema),
  userController.createStudent,
);
router.post(
  '/create-faculty',
  auth(USER_ROLE.admin),
  validateRequest(facultyValidation.facultyValidationSchema),
  userController.createFaculty,
);
router.post(
  '/create-admin',
  auth(USER_ROLE.admin),
  validateRequest(AdminValidations.createAdminValidationSchema),
  userController.createAdmin,
);

export const userRoutes = router;
