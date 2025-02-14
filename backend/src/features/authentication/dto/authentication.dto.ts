import { required } from '@common/utilities/mark-as-required.util';
import { z } from 'zod';

export const authenticationSchema = z
  .object({
    username: z
      .string({
        required_error: 'Username is required',
        invalid_type_error: 'Username must be a string',
      })
      .toLowerCase(),
    password: z.string({
      required_error: 'Password is required',
      invalid_type_error: 'Password must be a string',
    }),
  })
  .required()
  .transform(required);

export type AuthenticationDto = z.infer<typeof authenticationSchema>;
