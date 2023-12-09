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
router.patch(
  '/:courseId',
  validateRequest(courseValidation.updateCreateCourseValidationSchema),
  courseCollections.updateSpecificCourse,
);
router.get('/:courseId', courseCollections.getSingleCourse);
router.delete('/:courseId', courseCollections.deleteSingleCourse);

router.post(
  '/:courseId/assign-faculties',
  validateRequest(courseValidation.createCourseFacultyValidationSchema),
  courseCollections.assignCourseFaculty,
);
router.delete(
  '/:courseId/remove-faculties',
 
  courseCollections.removeCourseFaculty,
);

export const courseRouters = router;
