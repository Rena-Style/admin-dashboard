import type { z } from 'zod';
import type { ProductSchema } from 'src/entities/product/product.schema';

export type TProduct = z.infer<typeof ProductSchema.item>;
export type TProductList = z.infer<typeof ProductSchema.list>;
export type TProductCreateRequest = z.infer<typeof ProductSchema.createRequest>;
export type TProductCreateResponse = z.infer<typeof ProductSchema.createResponse>;
export type TProductEditRequest = z.infer<typeof ProductSchema.editRequest>;
