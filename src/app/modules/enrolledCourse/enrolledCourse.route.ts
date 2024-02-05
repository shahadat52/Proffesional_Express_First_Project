import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { enrolledCourseValidations } from './enrolledCourse.validation';
import { enrolledCourseCollections } from './enrolledCourse.controller';
import auth from '../../middlewares/auth';
const router = express.Router();

router.post(
  '/',
  auth('student'),
  validateRequest(
    enrolledCourseValidations.createEnrolledCourseValidationSchema,
  ),
  enrolledCourseCollections.createEnrolledCourse,
);
router.get('/', auth('admin'), enrolledCourseCollections.getAllEnrolledCourse);

router.patch(
  '/update-student-marks',
  auth('faculty'),
  validateRequest(
    enrolledCourseValidations.updateEnrolledCourseMarksValidationSchema,
  ),
  enrolledCourseCollections.updateEnrolledCourseMarks,
);

export const enrolledCourseRouters = router;
