import { z } from 'zod';

export class UtilsSchema {
  public static readonly id = z.string().uuid();

  public static readonly pagination = z.object({
    offset: z.number().optional().default(0),
    limit: z.number().optional().default(10),
  });
}
