import type { Tid, TPagination } from 'src/entities/system/utils.type';
import type {
  TProductList,
  TProductEditRequest,
  TProductCreateRequest,
  TProductCreateResponse,
} from 'src/entities/product/product.type';

import { type AxiosInstance } from 'axios';

import { ENDPOINT } from 'src/entities/system/endpoint.config';
import { UtilsSchema } from 'src/entities/system/utils.schema';
import { ProductSchema } from 'src/entities/product/product.schema';
import { AbstractService } from 'src/entities/system/abstract.service';

export class ProductService extends AbstractService {
  public constructor(apiService: AxiosInstance) {
    super(apiService);
  }

  public async getList(groupId: Tid, queryPagination?: TPagination): Promise<TProductList> {
    const pagination = UtilsSchema.pagination.parse(queryPagination);
    const group = UtilsSchema.id.parse(groupId);

    const response = await this.apiService.get(
      `${ENDPOINT.PRODUCT(group)}?offset=${pagination.offset}&limit=${pagination.limit}`
    );
    const data = this.handleResponse(response);

    return ProductSchema.list.parse(data);
  }

  public async create(groupId: Tid, body: TProductCreateRequest): Promise<TProductCreateResponse> {
    const data = ProductSchema.createRequest.parse(body);
    const group = UtilsSchema.id.parse(groupId);

    const response = await this.apiService.post(ENDPOINT.PRODUCT(group), data);
    const returnData = this.handleResponse(response);

    return ProductSchema.createResponse.parse(returnData);
  }

  public async edit(groupId: Tid, productId: Tid, body: TProductEditRequest): Promise<null> {
    const group = UtilsSchema.id.parse(groupId);
    const id = UtilsSchema.id.parse(productId);
    const data = ProductSchema.editRequest.parse(body);

    const response = await this.apiService.patch(`${ENDPOINT.PRODUCT(group)}/${id}`, data);
    this.handleResponse(response);

    return null;
  }

  public async delete(groupId: Tid, productId: Tid): Promise<null> {
    const group = UtilsSchema.id.parse(groupId);
    const id = UtilsSchema.id.parse(productId);

    const response = await this.apiService.patch(`${ENDPOINT.PRODUCT(group)}/${id}`);
    this.handleResponse(response);

    return null;
  }
}
