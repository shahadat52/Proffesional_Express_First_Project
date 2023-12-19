import express from 'express';
import { offeredCourseCollections } from './offeredCourse.collection';
import validateRequest from '../../middlewares/validateRequest';
import { offeredCourseValidationSchemas } from './offeredCourse.validation';
const router = express.Router();

router.post(
  '/',
  validateRequest(
    offeredCourseValidationSchemas.createOfferedCourseValidationSchema,
  ),
  offeredCourseCollections.createOfferedCourse,
);

router.get('/', offeredCourseCollections.getAllOfferedCourse);

export const offeredCourseRouter = router;
