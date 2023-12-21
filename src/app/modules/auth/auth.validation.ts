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

const updatePasswordValidationSchema = z.object({
  body: z.object({
    oldPassword: z.string({
      required_error: 'Old password is required',
    }),
    newPassword: z.string({
      required_error: 'New password is required',
    }),
  }),
});

const refreshTokenValidationSchema = z.object({
  cookies: z.object({
    refreshToken: z.string({
      required_error: 'Refresh token is required',
    }),
  }),
});

export const authValidationSchemas = {
  loginValidationSchema,
  updatePasswordValidationSchema,
  refreshTokenValidationSchema,
};
