import type { z } from 'zod';
import type { UtilsSchema } from 'src/entities/system/utils.schema';

export type Tid = z.infer<typeof UtilsSchema.id>;
export type TPagination = z.infer<typeof UtilsSchema.pagination>;
