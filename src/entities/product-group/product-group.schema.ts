import { z } from 'zod';

export class ProductGroupSchema {
  public static readonly id = z.string().uuid();

  public static readonly item = z.object({
    product_group_id: ProductGroupSchema.id,
    name: z.string(),
  });

  public static readonly list = z.array(ProductGroupSchema.item);

  public static readonly query = z.object({
    offset: z.number().optional().default(0),
    limit: z.number().optional().default(10),
  });

  public static readonly createRequest = ProductGroupSchema.item.pick({ name: true });

  public static readonly createResponse = ProductGroupSchema.item.pick({ product_group_id: true });

  public static readonly editRequest = ProductGroupSchema.item.pick({ name: true });
}
