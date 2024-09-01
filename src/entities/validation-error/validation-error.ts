import type { TValidationError } from 'src/entities/validation-error/validation-error.type';

import { ValidationErrorSchema } from 'src/entities/validation-error/validation-error.schema';

export class ValidationError extends Error {
  private readonly error: TValidationError;

  public constructor(
    error: TValidationError,
    public readonly code: number,
    public readonly text: string
  ) {
    super('Api Validation error');
    this.error = ValidationErrorSchema.error.parse(error);
  }

  public get detail(): TValidationError['detail'] {
    return this.error.detail;
  }

  public get body(): TValidationError['body'] {
    return this.error.body;
  }
}
