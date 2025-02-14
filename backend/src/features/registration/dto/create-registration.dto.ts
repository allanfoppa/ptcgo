import { required } from '@common/utilities/mark-as-required.util';
import { z } from 'zod';

export const registrationSchema = z
  .object({
    username: z
      .string({
        required_error: 'Username is required',
        invalid_type_error: 'Username must be a string',
      })
      .toLowerCase()
      .min(3)
      .max(18),
    password: z
      .string({
        required_error: 'Password is required',
        invalid_type_error: 'Password must be a string',
      })
      .min(8)
      .max(32),
  })
  .required()
  .transform(required);

export type RegistrationDto = z.infer<typeof registrationSchema>;
