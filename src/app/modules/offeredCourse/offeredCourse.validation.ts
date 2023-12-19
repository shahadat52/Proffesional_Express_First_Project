import { z } from 'zod';
import { Days } from './offeredCourse.constant';
const timeString = z.string().refine((time) => {
  const timeValidation =
    /^([01]?[0-9]|2[0-3]):([0-5][0-9])(:[0-5][0-9])?$/.test(time);
  return timeValidation;
});
const createOfferedCourseValidationSchema = z.object({
  body: z
    .object({
      semesterRegistration: z.string(),
      academicFaculty: z.string(),
      academicDepartment: z.string(),
      course: z.string(),
      faculty: z.string(),
      maxCapacity: z.number(),
      section: z.number(),
      days: z.array(z.enum([...Days] as [string, ...string[]])),
      startTime: timeString,
      endTime: timeString,
    })
    .refine(
      (body) => {
        const start = new Date(`1970-01-01T${body.startTime}:00`);
        const end = new Date(`1970-01-01T${body.endTime}:00`);
        return end > start;
      },
      {
        message: 'Start time should be before end time',
      },
    ),
});

const updateOfferedCourseValidationSchema = z.object({
  body: z
    .object({
      semesterRegistration: z.string().optional(),
      academicFaculty: z.string().optional(),
      academicDepartment: z.string().optional(),
      course: z.string().optional(),
      faculty: z.string(),
      maxCapacity: z.number().optional(),
      section: z.number().optional(),
      days: z.array(z.enum([...Days] as [string, ...string[]])),
      startTime: timeString,
      endTime: timeString,
    })
    .refine(
      (body) => {
        const start = new Date(`1970-01-01T${body.startTime}:00`);
        const end = new Date(`1970-01-01T${body.endTime}:00`);
        return end > start;
      },
      {
        message: 'Start time should be before end time',
      },
    ),
});

export const offeredCourseValidationSchemas = {
  createOfferedCourseValidationSchema,
  updateOfferedCourseValidationSchema,
};
