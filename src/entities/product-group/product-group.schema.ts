import { z } from 'zod';

import { UtilsSchema } from 'src/entities/system/utils.schema';

export class ProductGroupSchema {
  public static readonly item = z.object({
    product_group_id: UtilsSchema.id,
    name: z.string(),
  });

  public static readonly list = z.array(ProductGroupSchema.item);

  public static readonly createRequest = ProductGroupSchema.item.pick({ name: true });

  public static readonly createResponse = ProductGroupSchema.item.pick({ product_group_id: true });

  public static readonly editRequest = ProductGroupSchema.item.pick({ name: true });
}
