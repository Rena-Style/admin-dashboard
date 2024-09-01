import type { z } from 'zod';
import type { ValidationErrorSchema } from 'src/entities/validation-error/validation-error.schema';

export type TValidationError = z.infer<typeof ValidationErrorSchema.error>;
