import express from 'express';
import { studentControllers } from './student.controller';
import validateRequest from '../../middlewares/validateRequest';
import { studentValidations } from './student.validation';
import auth from '../../middlewares/auth';
const router = express.Router();

//router will call controller fn
router.get('/', auth('faculty', 'admin'), studentControllers.getStudents);
router.get(
  '/:studentId',
  auth('student', 'faculty', 'admin'),
  studentControllers.getSingleStudent,
);
router.delete('/:studentId', studentControllers.deleteStudent);
router.patch(
  '/:studentId',
  validateRequest(studentValidations.updateStudentValidationSchema),
  studentControllers.updatedStudent,
);

export const studentRoutes = router;
