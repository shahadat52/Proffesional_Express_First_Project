import { z } from 'zod';

const preRequisiteCourseSchema = z.object({
  course: z.string(),
  isDeleted: z.boolean().optional(),
});
const createCourseValidationSchema = z.object({
  body: z.object({
    title: z.string(),
    prefix: z.string(),
    code: z.number(),
    credits: z.number(),
    isDeleted: z.boolean().optional(),
    preRequisiteCourse: z.array(preRequisiteCourseSchema).optional(),
  }),
});

const updatePreRequisiteCourseSchema = z.object({
  course: z.string(),
  isDeleted: z.boolean().optional(),
});
const updateCreateCourseValidationSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    prefix: z.string().optional(),
    code: z.number().optional(),
    credits: z.number().optional(),
    isDeleted: z.boolean().optional(),
    preRequisiteCourse: z.array(updatePreRequisiteCourseSchema).optional(),
  }),
});

const createFacultiesValidationSchema = z.string();

const createCourseFacultyValidationSchema = z.object({
  body: z.object({
    faculties: z.array(createFacultiesValidationSchema),
  }),
});
export const courseValidation = {
  createCourseValidationSchema,
  updateCreateCourseValidationSchema,
  createCourseFacultyValidationSchema,
};



// 6573ddb02396286fc02c2de2

// 6573ddb02396286fc02c2de2