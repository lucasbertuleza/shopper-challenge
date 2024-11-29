import { PartnerDriver } from '@modules/partner-drivers/partner-driver.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { DRIVER_NOT_FOUND, INVALID_DISTANCE } from 'src/constants/codes';
import { Repository } from 'typeorm';
import { RideConfirmDto } from './ride-confirm.dto';

@Injectable()
@ValidatorConstraint({ name: DRIVER_NOT_FOUND, async: true })
export class DriverNotFoundConstraint implements ValidatorConstraintInterface {
  constructor(
    @InjectRepository(PartnerDriver)
    private partnerDriversRepository: Repository<PartnerDriver>,
  ) {}

  async validate(driver: { name: string; id: number }): Promise<boolean> {
    // skip validation
    if (!(driver && driver.id && driver.name)) return true;

    return this.partnerDriversRepository.existsBy({ id: driver.id, name: driver.name });
  }

  defaultMessage(args: ValidationArguments): string {
    return `id=${args.value.id};name=${args.value.name}`;
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
    if (!(driver && driver.id && driver.name) || !distance) return true;

    // skip validation
    const query = { id: driver.id, name: driver.name };
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
