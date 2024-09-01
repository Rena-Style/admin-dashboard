import type { z } from 'zod';
import type { ProductGroupSchema } from 'src/entities/product-group/product-group.schema';

export type TProductGroupId = z.infer<typeof ProductGroupSchema.id>;
export type TProductGroup = z.infer<typeof ProductGroupSchema.item>;
export type TProductGroupList = z.infer<typeof ProductGroupSchema.list>;
export type TProductGroupQuery = z.infer<typeof ProductGroupSchema.query>;
export type TProductGroupCreateRequest = z.infer<typeof ProductGroupSchema.createRequest>;
export type TProductGroupCreateResponse = z.infer<typeof ProductGroupSchema.createResponse>;
export type TProductGroupEditRequest = z.infer<typeof ProductGroupSchema.editRequest>;
