import { z } from "zod";

const preRequisiteCourseSchema = z.object({
    course: z.string(),
    isDeleted: z.boolean().optional()
})
const createCourseValidationSchema = z.object({
    body: z.object({
        title: z.string(),
        prefix: z.string(),
        code:z.number(),
        credits: z.number(),
        isDeleted: z.boolean().optional(),
        preRequisiteCourse: z.array(preRequisiteCourseSchema).optional()
    })
})

export const courseValidation = {
    createCourseValidationSchema
}