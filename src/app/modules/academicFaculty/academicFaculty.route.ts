import express from 'express';
import { academicFacultiesControllers } from './academicFaculty.controller';
import validateRequest from '../../middlewares/validateRequest';
import { academicFacultyValidationSchemas } from './academicFaculty.validation';
const router = express.Router();

router.post(
  '/',
  validateRequest(
    academicFacultyValidationSchemas.createAcademicFacultyValidationSchema,
  ),
  academicFacultiesControllers.createAcademicFaculty,
);
router.get('/', academicFacultiesControllers.getAllAcademicFaculties);

export const academicFacultyRoute = router;
