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

export const enrolledCourseRouters = router;
