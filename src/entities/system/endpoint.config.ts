import type { Tid } from 'src/entities/system/utils.type';

export const ENDPOINT = {
  PRODUCT_GROUP: '/supplier/product-group',
  PRODUCT: (groupId: Tid) => `/supplier/product-group/${groupId}/product
`,
} as const;
