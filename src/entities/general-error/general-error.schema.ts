import { z } from 'zod';

export class GeneralErrorSchema {
  public static readonly error = z.object({
    detail: z.string(),
  });
}
