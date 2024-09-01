import { z } from 'zod';

import { UtilsSchema } from 'src/entities/system/utils.schema';

export class ProductSchema {
  public static readonly item = z.object({
    sku: z.string(),
    name: z.string(),
    base_price: z.number(),
    price_before_sale: z.number().nullable(),
    description: z.string(),
    brand: z.string(),
    quantity: z.number(),
    delivery: z.boolean(),
    delivery_period: z.string().nullable(),
    pickup: z.boolean(),
    pickup_period: z.string().nullable(),
  });

  public static readonly list = z.array(ProductSchema.item);

  public static readonly createRequest = z.object({
    sku: z.string(),
    name: z.string(),
    base_price: z.number(),
    price_before_sale: z.number().nullable().optional(),
    description: z.string(),
    brand: z.string(),
    quantity: z.number(),
    delivery: z.boolean().optional(),
    delivery_period: z.string().nullable().optional(),
    pickup: z.boolean().optional(),
    pickup_period: z.string().nullable().optional(),
  });

  public static readonly createResponse = z.object({
    product_id: UtilsSchema.id,
  });

  public static readonly editRequest = z.object({
    sku: z.string().nullable().default(null),
    name: z.string().nullable().default(null),
    base_price: z.number().nullable().default(null),
    price_before_sale: z.number().nullable().default(null),
    description: z.string().nullable().default(null),
    brand: z.string().nullable().default(null),
    quantity: z.number().nullable().default(null),
    delivery: z.boolean().nullable().default(null),
    delivery_period: z.string().nullable().default(null),
    pickup: z.boolean().nullable().default(null),
    pickup_period: z.string().nullable().default(null),
  });
}
