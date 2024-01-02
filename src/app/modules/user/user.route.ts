import express from 'express';
import { userController } from './user.controller';
import validateRequest from '../../middlewares/validateRequest';
import { createStudentValidationSchema } from '../student/student.validation';
import { facultyValidation } from '../faculty/faculty.validation';
import { AdminValidations } from '../admin/admin.validation';
import auth from '../../middlewares/auth';
import { USER_ROLE } from './user.constant';
import { userValidationSchemas } from './user.validation';
import { upload } from '../../utils/sendImageToCloudinary';

const router = express.Router();

router.post(
  '/create-student',
  auth(USER_ROLE.admin),
  upload.single('file'),
  (req, res, next) => {
    const data = JSON.parse(req?.body.data);
    req.body = data;
    next()
  },
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
  validateRequest(AdminValidations.createAdminValidationSchema),
  userController.createAdmin,
);

router.patch(
  '/change-status/:userId',
  validateRequest(userValidationSchemas.changeStatusValidationSchema),
  userController.changeStatus,
);
export const userRoutes = router;
