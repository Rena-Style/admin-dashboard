import type { ZodError } from 'zod';
import type { Tid, TPagination } from 'src/entities/system/utils.type';
import type { GeneralError } from 'src/entities/general-error/general-error';
import type { ValidationError } from 'src/entities/validation-error/validation-error';
import type { TProductGroupList } from 'src/entities/product-group/product-group.type';

import { create } from 'zustand';

import { apiService } from 'src/entities/system/api.service';
import { ProductGroupService } from 'src/entities/product-group/product-group.service';

export interface IProductGroupState {
  list: TProductGroupList | null;
  id: Tid | null;
  loading: boolean;
  error: ValidationError | GeneralError | ZodError | Error | null;
  setId: (id: Tid) => void;
  removeId: () => void;
  fetchProductGroupList: (query?: TPagination) => Promise<void>;
}

export const useProductGroupStore = create<IProductGroupState>((set) => ({
  list: null,
  id: null,
  loading: false,
  error: null,
  setId: (id) => set({ id }),
  removeId: () => set({ id: null }),
  removeList: () => set({ list: null }),
  fetchProductGroupList: async (query) => {
    try {
      set({ loading: true });
      const productGroupService = new ProductGroupService(apiService);
      const list = await productGroupService.getList(query);
      set({ list });
    } catch (error) {
      set({ error });
    } finally {
      set({ loading: false });
    }
  },
}));
