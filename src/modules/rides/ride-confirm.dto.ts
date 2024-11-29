import {
  IsNotEmpty,
  IsNotEmptyObject,
  IsPositive,
  IsString,
  ValidateNested,
} from 'class-validator';
import { RideEstimateDto } from './ride-estimate.dto';
import { Type } from 'class-transformer';
import { IsValidDistance, IsValidDriver } from './ride-corfirm.constraints';

class DriverDto {
  @IsNotEmpty()
  @IsPositive()
  id: number;

  @IsNotEmpty()
  @IsString()
  name: string;
}

export class RideConfirmDto extends RideEstimateDto {
  @IsString()
  @IsNotEmpty()
  duration: string;

  @IsPositive()
  @IsNotEmpty()
  value: number;

  @IsNotEmpty()
  @IsPositive()
  @IsValidDistance()
  distance: number;

  @IsNotEmptyObject()
  @ValidateNested()
  @IsValidDriver()
  @Type(() => DriverDto)
  driver: DriverDto;
}
