import { z } from 'zod';

const facultyNameValidationSchema = z.object({
  firstName: z.string({
    invalid_type_error: 'first name must be string',
    required_error: 'First name must be required',
  }),
  lastName: z.string({
    required_error: 'must be required',
  }),
  middleName: z.string({
    required_error: 'must be required',
  }),
});

const facultyValidationSchema = z.object({
  body: z.object({
    password: z.string().optional(),
    faculty: z.object({
      id: z.string({}).min(1).max(255).optional(),
      name: facultyNameValidationSchema,
      designation: z
        .string({
          required_error: 'must be required',
        })
        .min(1)
        .max(255),
      gender: z.enum(['male', 'female', 'other']),
      dateOfBirth: z.string({
        required_error: ' must be required',
      }),
      email: z
        .string({
          required_error: 'must be required',
        })
        .email(),
      contractNo: z
        .string({
          required_error: 'must be required',
        })
        .min(1)
        .max(255),
      emergencyContract: z
        .string({
          required_error: 'must be required',
        })
        .min(1)
        .max(255),
      bloodGroup: z
        .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
        .nullable(),
      presentAddress: z
        .string({
          required_error: 'must be required',
        })
        .min(1)
        .max(255),
      permanentAddress: z
        .string({
          required_error: 'must be required',
        })
        .min(1)
        .max(255),
      academicDepartment: z
        .string({
          required_error: 'must be required',
        })
        .min(1)
        .max(255),
    }),
  }),
});

export const facultyValidation = {
  facultyValidationSchema,
};
