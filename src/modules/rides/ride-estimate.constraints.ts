import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { INVALID_DATA } from 'src/constants/codes';

@ValidatorConstraint({ name: INVALID_DATA, async: false })
export class DestinationAndOriginEqualsConstraint implements ValidatorConstraintInterface {
  validate(destination: string, args?: ValidationArguments): boolean {
    const origin = (args?.object as any)['origin'] as string;
    // skip validation
    if (!destination || !origin) return true;

    return destination !== origin;
  }

  defaultMessage(): string {
    return 'origin and destination parameters have the same value';
  }
}

export function DestinationAndOriginEquals(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      propertyName,
      target: object.constructor,
      options: validationOptions,
      constraints: [],
      validator: DestinationAndOriginEqualsConstraint,
    });
  };
}
