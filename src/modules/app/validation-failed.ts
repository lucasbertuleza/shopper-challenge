import * as Exceptions from '@nestjs/common/exceptions';
import {
  NotAcceptableException,
  NotFoundException,
  BadRequestException,
  ValidationError,
} from '@nestjs/common';
import {
  DRIVER_NOT_FOUND,
  INVALID_DATA,
  INVALID_DISTANCE,
  INVALID_DRIVER,
  NO_RIDES_FOUND,
} from 'src/constants/codes';

type HttpExceptions = {
  [K in keyof typeof Exceptions]: InstanceType<(typeof Exceptions)[K]>;
}[keyof typeof Exceptions];

export function ValidationFailed(errors: ValidationError[]) {
  const errorMessages: string[] = [];

  errors.forEach((error) => {
    for (const key in error.constraints) errorMessages.push(error.constraints[key]);

    error.children?.forEach((childrenError) => {
      for (const key in childrenError.constraints)
        errorMessages.push(`${error.property} ${childrenError.constraints[key]}`);
    });
  });

  const firstConstraintFound = Object.keys(errors[0].constraints || {})[0];
  return getException(firstConstraintFound, errorMessages.toString());
}

function getException(error_code: string, error_description: string): HttpExceptions {
  const error = { error_code, error_description };

  switch (error_code) {
    case INVALID_DATA:
    case INVALID_DRIVER:
      return new BadRequestException(error);

    case DRIVER_NOT_FOUND:
    case NO_RIDES_FOUND:
      return new NotFoundException(error);

    case INVALID_DISTANCE:
      return new NotAcceptableException(error);

    default:
      error.error_code = INVALID_DATA;
      return new BadRequestException(error);
  }
}
