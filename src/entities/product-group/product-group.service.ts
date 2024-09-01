import type { AxiosInstance } from 'axios';
import type {
  TProductGroupId,
  TProductGroupList,
  TProductGroupQuery,
  TProductGroupEditRequest,
  TProductGroupCreateRequest,
  TProductGroupCreateResponse,
} from 'src/entities/product-group/product-group.type';

import { HttpStatusCode } from 'axios';

import { ENDPOINT } from 'src/entities/system/endpoint.config';
import { GeneralError } from 'src/entities/general-error/general-error';
import { ValidationError } from 'src/entities/validation-error/validation-error';
import { ProductGroupSchema } from 'src/entities/product-group/product-group.schema';

export class ProductGroupService {
  public constructor(private readonly apiService: AxiosInstance) {}

  public async getList(queryParams?: TProductGroupQuery): Promise<TProductGroupList> {
    const query = ProductGroupSchema.query.parse(queryParams);
    const response = await this.apiService.get(
      `${ENDPOINT.PRODUCT_GROUP}?offset=${query.offset}&limit=${query.limit}`
    );

    switch (response.status) {
      case HttpStatusCode.Ok:
        return ProductGroupSchema.list.parse(response.data);

      case HttpStatusCode.UnprocessableEntity:
        throw new ValidationError(response.data, response.status, response.statusText);

      case HttpStatusCode.Forbidden:
      case HttpStatusCode.InternalServerError:
        throw new GeneralError(response.data, response.status, response.statusText);

      default:
        throw new Error(response.statusText);
    }
  }

  public async create(body: TProductGroupCreateRequest): Promise<TProductGroupCreateResponse> {
    const data = ProductGroupSchema.createRequest.parse(body);

    const response = await this.apiService.post(ENDPOINT.PRODUCT_GROUP, data);

    switch (response.status) {
      case HttpStatusCode.Ok:
        return ProductGroupSchema.createResponse.parse(response.data);

      case HttpStatusCode.UnprocessableEntity:
        throw new ValidationError(response.data, response.status, response.statusText);

      case HttpStatusCode.Forbidden:
      case HttpStatusCode.InternalServerError:
        throw new GeneralError(response.data, response.status, response.statusText);

      default:
        throw new Error(response.statusText);
    }
  }

  public async edit(id: TProductGroupId, body: TProductGroupEditRequest): Promise<null> {
    const productGroupId = ProductGroupSchema.id.parse(id);
    const data = ProductGroupSchema.editRequest.parse(body);
    const response = await this.apiService.patch(
      `${ENDPOINT.PRODUCT_GROUP}/${productGroupId}`,
      data
    );

    switch (response.status) {
      case HttpStatusCode.NoContent:
        return null;

      case HttpStatusCode.UnprocessableEntity:
        throw new ValidationError(response.data, response.status, response.statusText);

      case HttpStatusCode.Forbidden:
      case HttpStatusCode.NotFound:
      case HttpStatusCode.InternalServerError:
        throw new GeneralError(response.data, response.status, response.statusText);

      default:
        throw new Error(response.statusText);
    }
  }

  public async delete(id: TProductGroupId): Promise<null> {
    const productGroupId = ProductGroupSchema.id.parse(id);

    const response = await this.apiService.delete(`${ENDPOINT.PRODUCT_GROUP}/${productGroupId}`);

    switch (response.status) {
      case HttpStatusCode.NoContent:
        return null;

      case HttpStatusCode.UnprocessableEntity:
        throw new ValidationError(response.data, response.status, response.statusText);

      case HttpStatusCode.Forbidden:
      case HttpStatusCode.NotFound:
      case HttpStatusCode.InternalServerError:
        throw new GeneralError(response.data, response.status, response.statusText);

      default:
        throw new Error(response.statusText);
    }
  }
}
