import { z } from 'zod';

const createAcademicDepartmentValidationSchema = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: 'Academic Department Name Type Error',
      required_error: 'Academic Department Name Must Be Error',
    }),
    academicFaculty: z.string({
      invalid_type_error: 'Academic Faculty Name Type Error',
      required_error: 'Academic Faculty Name Must Be Error',
    }),
  }),
});

const updateAcademicDepartmentValidationSchema = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: 'Academic Department Name Type Error',
      required_error: 'Academic Department Name Must Be Error',
    }).optional(),
    academicFaculty: z.string({
      invalid_type_error: 'Academic Faculty Name Type Error',
      required_error: 'Academic Faculty Name Must Be Error',
    }).optional(),
  }),
});

export const academicDepartmentValidationSchemas = {
  createAcademicDepartmentValidationSchema,
  updateAcademicDepartmentValidationSchema,
};
