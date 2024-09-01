import { z } from 'zod';

export class ValidationErrorSchema {
  public static readonly error = z.object({
    detail: z.array(
      z.object({
        message: z.string(),
        location: z.array(z.string()),
      })
    ),
    body: z.unknown(),
  });
}
