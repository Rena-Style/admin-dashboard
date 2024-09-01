import type { z } from 'zod';
import type { GeneralErrorSchema } from 'src/entities/general-error/general-error.schema';

export type TGeneralError = z.infer<typeof GeneralErrorSchema.error>;
