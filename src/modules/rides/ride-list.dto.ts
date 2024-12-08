import { Transform } from 'class-transformer';
import { IsNumberString, IsOptional } from 'class-validator';
import { IsValidDriver } from './ride-corfirm.constraints';

export class RideListDto {
  @Transform(({ value }) => parseInt(value), { toPlainOnly: true })
  @IsValidDriver()
  @IsNumberString()
  @IsOptional()
  driver_id: number;
}
