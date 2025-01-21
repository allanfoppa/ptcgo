import { z } from 'zod';

export const createRegistrationSchema = z
  .object({
    username: z.string().min(3).max(18),
    password: z.string().min(8).max(32),
  })
  .required();

export type CreateRegistrationDto = z.infer<typeof createRegistrationSchema>;
