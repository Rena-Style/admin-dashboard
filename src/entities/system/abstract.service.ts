import { HttpStatusCode, type AxiosInstance, type AxiosResponse } from 'axios';

import { GeneralError } from 'src/entities/general-error/general-error';
import { ValidationError } from 'src/entities/validation-error/validation-error';

export abstract class AbstractService {
  protected constructor(protected readonly apiService: AxiosInstance) {}

  // eslint-disable-next-line class-methods-use-this
  protected handleResponse<T>(response: AxiosResponse): T {
    switch (response.status) {
      case HttpStatusCode.Ok:
      case HttpStatusCode.NoContent:
        return response.data;

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
