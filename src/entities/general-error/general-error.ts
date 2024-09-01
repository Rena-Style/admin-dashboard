import type { TGeneralError } from 'src/entities/general-error/general-error.type';

import { GeneralErrorSchema } from 'src/entities/general-error/general-error.schema';

export class GeneralError extends Error {
  private readonly error: TGeneralError;

  public constructor(
    error: TGeneralError,
    public readonly code: number,
    public readonly text: string
  ) {
    super('Api General Error');
    this.error = GeneralErrorSchema.error.parse(error);
  }

  public get detail(): TGeneralError['detail'] {
    return this.error.detail;
  }
}
