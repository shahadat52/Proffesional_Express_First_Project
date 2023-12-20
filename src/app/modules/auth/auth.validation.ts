import { z } from 'zod';

const loginValidationSchema = z.object({
  body: z.object({
    id: z.string({
      required_error: 'id must be required',
      invalid_type_error: 'id type must be string',
    }),
    password: z.string({
      required_error: 'Password must be required',
      invalid_type_error: 'Passwords type must be string',
    }),
  }),
});

export const loginValidationSchemas = {
  loginValidationSchema,
};
