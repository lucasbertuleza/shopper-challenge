import { PartnerDriver } from '@modules/partner-drivers/partner-driver.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  isNumberString,
  registerDecorator,
  validate,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { DRIVER_NOT_FOUND, INVALID_DISTANCE } from 'src/constants/codes';
import { Repository } from 'typeorm';
import { DriverDto, RideConfirmDto } from './ride-confirm.dto';

@Injectable()
@ValidatorConstraint({ name: DRIVER_NOT_FOUND, async: true })
export class DriverNotFoundConstraint implements ValidatorConstraintInterface {
  constructor(
    @InjectRepository(PartnerDriver)
    private partnerDriversRepository: Repository<PartnerDriver>,
  ) {}

  async validate(driver: DriverDto | string): Promise<boolean> {
    // skip validation
    if (!driver) return true;
    if (typeof driver === 'string' && !isNumberString(driver)) return true;
    if (typeof driver !== 'string' && (await validate(driver)).length) return true;

    const query =
      typeof driver === 'string' ? { id: driver } : { ...driver, id: driver.id.toString() };

    return this.partnerDriversRepository.existsBy(query);
  }

  defaultMessage(args: ValidationArguments): string {
    return typeof args.value === 'string'
      ? `id=${args.value}`
      : `id=${args.value.id};name=${args.value.name}`;
  }
}

@Injectable()
@ValidatorConstraint({ name: INVALID_DISTANCE, async: true })
export class InvalidDistanceConstraint implements ValidatorConstraintInterface {
  constructor(
    @InjectRepository(PartnerDriver)
    private partnerDriversRepository: Repository<PartnerDriver>,
  ) {}

  async validate(distance: number, args: ValidationArguments): Promise<boolean> {
    // skip validation
    const { driver } = args.object as RideConfirmDto;
    const hasErrors = (await validate(driver)).length > 0;
    if (hasErrors || !distance) return true;
    // skip validation
    const query = { ...driver, id: driver.id.toString() };
    const persistedDriver = await this.partnerDriversRepository.findOneBy(query);
    if (!persistedDriver) return true;

    return distance >= persistedDriver.minimumMileage;
  }

  defaultMessage(): string {
    return "the distance ($value meters) is less than the driver's minimum mileage";
  }
}

export function IsValidDistance(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      propertyName,
      target: object.constructor,
      options: validationOptions,
      constraints: [],
      validator: InvalidDistanceConstraint,
    });
  };
}

export function IsValidDriver(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      propertyName,
      target: object.constructor,
      options: validationOptions,
      constraints: [],
      validator: DriverNotFoundConstraint,
    });
  };
}
