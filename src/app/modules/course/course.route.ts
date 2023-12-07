import express from 'express';
import { courseCollections } from './course.controller';
import validateRequest from '../../middlewares/validateRequest';
import { courseValidation } from './course.validation';
const router = express.Router();

router.post(
  '/create-course',
  validateRequest(courseValidation.createCourseValidationSchema),
  courseCollections.createCourse,
);
router.get('/', courseCollections.getAllCourses);
router.get('/:courseId', courseCollections.getSingleCourse);
router.delete('/:courseId', courseCollections.updateSingleCourse);

export const courseRouters = router;
