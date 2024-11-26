import { BadRequestException } from '@nestjs/common/exceptions/bad-request.exception';
import { ValidationError } from '@nestjs/common/interfaces/external/validation-error.interface';

export function ValidationFailed(errors: ValidationError[]) {
  const errorsMessages = errors
    .flatMap((error) => {
      return Object.values<string>(error.constraints || {});
    })
    .join('; ');

  return new BadRequestException({
    error_code: 'INVALID_DATA',
    error_description: `${errorsMessages}.`,
  });
}
