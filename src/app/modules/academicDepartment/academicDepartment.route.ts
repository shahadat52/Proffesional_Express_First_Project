import express from 'express';
import { academicDepartmentControllers } from './academicDepartment.controller';
import validateRequest from '../../middlewares/validateRequest';
import { academicDepartmentValidationSchemas } from './academicDepartment.validation';
const router = express.Router();

router.post(
  '/create-academic-department',
  validateRequest(
    academicDepartmentValidationSchemas.createAcademicDepartmentValidationSchema,
  ),
  academicDepartmentControllers.createAcademicDepartment,
);
router.get('/', academicDepartmentControllers.getAllAcademicDepartment);
router.get(
  '/:departmentId',
  academicDepartmentControllers.getSingleAcademicDepartment,
);
router.patch(
  '/:departmentId',
  validateRequest(
    academicDepartmentValidationSchemas.updateAcademicDepartmentValidationSchema,
  ),
  academicDepartmentControllers.updateAcademicDepartment,
);

export const academicDepartmentRouter = router;
