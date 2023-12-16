// import { boolean } from 'joi';
import { z } from 'zod';

const createStudentNameZodSchema = z.object({
  firstName: z
    .string()
    .min(1)
    .max(20)
    .refine((value) => /^[A-Z]/.test(value), {
      message: 'First name must start with a capital letter',
    }),
  middleName: z.string().optional(),
  lastName: z
    .string()
    .min(1)
    .refine((value) => /^[A-Za-z]+$/.test(value), {
      message: 'Last name allows only letters',
    }),
});

const createGuardianZodSchema = z.object({
  fatherName: z.string().min(1),
  fatherOccupation: z.string().min(1),
  fatherContactNo: z.string().min(1),
  motherName: z.string().min(1),
  motherOccupation: z.string().min(1),
  motherContactNo: z.string().min(1),
});

const createLocalGuardianZodSchema = z.object({
  name: z.string().min(1),
  occupation: z.string().min(1),
  contactNo: z.string().min(1),
  address: z.string().min(1),
});

export const createStudentValidationSchema = z.object({
  body: z.object({
    password: z
      .string()
      .max(20, 'Password not allow more then 20 characters')
      .optional(),
    student: z.object({
      name: createStudentNameZodSchema,
      gender: z.enum(['male', 'female']),
      dateOfBirth: z.string().optional(),
      email: z.string().email({ message: 'Invalid email address' }),
      contactNo: z.string().min(1),
      emergencyContactNo: z.string().min(1),
      bloodGroup: z
        .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
        .optional(),
      presentAddress: z.string().min(1),
      permanentAddress: z.string().min(1),
      guardian: createGuardianZodSchema,
      localGuardian: createLocalGuardianZodSchema,
      profileImage: z.string().min(1),
      isActive: z.enum(['active', 'block']),
      admissionSemester: z.string(),
      isDeleted: z.boolean(),
    }),
  }),
});

const updateStudentNameZodSchema = z.object({
  firstName: z
    .string()
    .min(1)
    .max(20)
    .refine((value) => /^[A-Z]/.test(value), {
      message: 'First name must start with a capital letter',
    })
    .optional(),
  middleName: z.string().optional(),
  lastName: z
    .string()
    .min(1)
    .refine((value) => /^[A-Za-z]+$/.test(value), {
      message: 'Last name allows only letters',
    })
    .optional(),
});

const updateGuardianZodSchema = z
  .object({
    fatherName: z.string().min(1).optional(),
    fatherOccupation: z.string().min(1).optional(),
    fatherContactNo: z.string().min(1).optional(),
    motherName: z.string().min(1).optional(),
    motherOccupation: z.string().min(1).optional(),
    motherContactNo: z.string().min(1).optional(),
  })
  .optional();

const updateLocalGuardianZodSchema = z
  .object({
    name: z.string().min(1).optional(),
    occupation: z.string().min(1).optional(),
    contactNo: z.string().min(1).optional(),
    address: z.string().min(1).optional(),
  })
  .optional();

export const updateStudentValidationSchema = z.object({
  body: z.object({
    student: z.object({
      name: updateStudentNameZodSchema,
      gender: z.enum(['male', 'female']).optional(),
      dateOfBirth: z.string().optional().optional(),
      email: z.string().email({ message: 'Invalid email address' }).optional(),
      contactNo: z.string().min(1).optional(),
      emergencyContactNo: z.string().min(1).optional(),
      bloodGroup: z
        .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
        .optional(),
      presentAddress: z.string().min(1).optional(),
      permanentAddress: z.string().min(1).optional(),
      guardian: updateGuardianZodSchema,
      localGuardian: updateLocalGuardianZodSchema,
      profileImage: z.string().min(1).optional(),
      isActive: z.enum(['active', 'block']).optional(),
      admissionSemester: z.string().optional(),
      isDeleted: z.boolean().optional(),
    }),
  }),
});

export const studentValidations = {
  createStudentValidationSchema,
  updateStudentValidationSchema,
};
