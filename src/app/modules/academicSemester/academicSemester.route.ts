import express from 'express';
import { academicSemesterControllers } from './academicSemester.controller';
import validateRequest from '../../middlewares/validateRequest';
import { academicSemesterValidationSchemas } from './academicSemester.validation';
const router = express.Router();

router.post(
  '/create-academic-semester',
  // validateRequest(
  //   academicSemesterValidationSchemas.createAcademicSemesterValidationSchema,
  // ),
  academicSemesterControllers.createAcademicSemester,
);
router.get('/', academicSemesterControllers.getAllAcademicSemester);
router.get('/:semesterId', academicSemesterControllers.getSingleSemester);
router.patch(
  '/:semesterId',
  validateRequest(
    academicSemesterValidationSchemas.updateAcademicSemesterValidationSchema,
  ),
  academicSemesterControllers.updateSingleSemester,
);

export const academicSemesterRouter = router;
