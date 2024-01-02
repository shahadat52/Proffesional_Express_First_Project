import { z } from 'zod';

const createEnrolledCourseValidationSchema = z.object({
  body: z.object({
    semesterRegistration: z.string(),
    academicSemester: z.string(),
    academicDepartment: z.string(),
    offeredCourse: z.string(),
    course: z.string(),
    student: z.string(),
    faculty: z.string(),
    isEnrolled: z.boolean(),
    courseMarks: z.object({
      classTest1: z.number(),
      midTerm: z.number(),
      classTest2: z.number(),
      final: z.number(),
    }),
    grade: z.enum(['A', 'B', 'C', 'D', 'F', 'NA']),
    gradePoints: z.number(),
    isCompleted: z.boolean(),
  }),
});

export const enrolledCourseValidations = {
  createEnrolledCourseValidationSchema,
};
