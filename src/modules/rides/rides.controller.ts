import {
  Body,
  Controller,
  HttpCode,
  Post,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { RidesService } from './rides.service';
import { PartnerDriversService } from '@modules/partner-drivers/partner-drivers.service';
import { RideEstimateDto } from './ride-estimate.dto';

@Controller('ride')
@UseInterceptors(ClassSerializerInterceptor)
export class RidesController {
  constructor(
    private readonly ridesService: RidesService,
    private readonly partnerDriversService: PartnerDriversService,
  ) {}

  @Post('estimate')
  @HttpCode(200)
  async estimate(@Body() { origin, destination }: RideEstimateDto) {
    const distance = await this.ridesService.computeRoute(origin, destination);
    const availableDrivers = await this.partnerDriversService.findAvailablesFromDistance(distance);
    return this.ridesService.getRideWith(availableDrivers);
  }
}
