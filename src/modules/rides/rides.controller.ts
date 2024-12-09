import {
  Body,
  Controller,
  HttpCode,
  Post,
  UseInterceptors,
  ClassSerializerInterceptor,
  Patch,
  Get,
  Query,
  Param,
} from '@nestjs/common';
import { RidesService } from './rides.service';
import { PartnerDriversService } from '@modules/partner-drivers/partner-drivers.service';
import { RideEstimateDto } from './ride-estimate.dto';
import { RideConfirmDto } from './ride-confirm.dto';
import { RideListDto } from './ride-list.dto';

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

  @Patch('confirm')
  @HttpCode(200)
  async confirm(@Body() rideConfirmDto: RideConfirmDto) {
    await this.ridesService.confirm(rideConfirmDto);
    return { success: true };
  }

  @Get(':customer_id')
  list(@Param('customer_id') customerId: string, @Query() query: RideListDto) {
    return this.ridesService.list(customerId, query.driver_id);
  }
}
