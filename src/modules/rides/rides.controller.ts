import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { RideEstimateDto } from './ride-estimate.dto';

@Controller('ride')
export class RidesController {
  @Post('estimate')
  @HttpCode(200)
  estimate(@Body() estimateDto: RideEstimateDto) {}
}
