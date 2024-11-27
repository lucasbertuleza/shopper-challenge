import { IsNotEmpty, IsString } from 'class-validator';
import { DestinationAndOriginEquals } from './ride-estimate.constraints';
export class RideEstimateDto {
  @IsNotEmpty()
  @IsString()
  customer_id: string;

  @IsString()
  @IsNotEmpty()
  origin: string;

  @IsNotEmpty()
  @IsString()
  @DestinationAndOriginEquals()
  destination: string;
}
