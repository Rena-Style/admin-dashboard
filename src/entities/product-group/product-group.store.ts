import type { ZodError } from 'zod';
import type { GeneralError } from 'src/entities/general-error/general-error';
import type { ValidationError } from 'src/entities/validation-error/validation-error';
import type {
  TProductGroupId,
  TProductGroupList,
  TProductGroupQuery,
} from 'src/entities/product-group/product-group.type';

import { create } from 'zustand';

import { apiService } from 'src/entities/system/api.service';
import { ProductGroupService } from 'src/entities/product-group/product-group.service';

export interface IProductGroupState {
  list: TProductGroupList | null;
  id: TProductGroupId | null;
  loading: boolean;
  error: ValidationError | GeneralError | ZodError | Error | null;
  setId: (id: TProductGroupId) => void;
  removeId: () => void;
  fetchProductGroupList: (query?: TProductGroupQuery) => Promise<void>;
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
