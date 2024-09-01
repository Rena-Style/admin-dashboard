import type { ZodError } from 'zod';
import type { TProductList } from 'src/entities/product/product.type';
import type { Tid, TPagination } from 'src/entities/system/utils.type';
import type { GeneralError } from 'src/entities/general-error/general-error';
import type { ValidationError } from 'src/entities/validation-error/validation-error';

import { create } from 'zustand';

import { apiService } from 'src/entities/system/api.service';
import { ProductService } from 'src/entities/product/product.service';

export interface IProductState {
  list: TProductList | null;
  groupId: Tid | null;
  id: Tid | null;
  loading: boolean;
  error: ValidationError | GeneralError | ZodError | Error | null;
  setGroupId: (groupId: Tid) => void;
  setId: (id: Tid) => void;

  removeGroup: () => void;
  removeId: () => void;

  fetchProductList: (query: TPagination) => Promise<void>;
}

export const useProductStore = create<IProductState>((set, store) => ({
  list: null,
  groupId: null,
  id: null,
  loading: false,
  error: null,

  setGroupId: (groupId) => set({ groupId }),
  setId: (id) => set({ id }),

  removeGroup: () => set({ groupId: null }),
  removeId: () => set({ id: null }),

  fetchProductList: async (query): Promise<void> => {
    const { groupId } = store();
    if (groupId !== null) {
      try {
        set({ loading: true });
        const productService = new ProductService(apiService);
        const list = await productService.getList(groupId, query);
        set({ list });
      } catch (error) {
        set({ error });
      } finally {
        set({ loading: false });
      }
    }
  },
}));
