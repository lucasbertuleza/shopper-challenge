import { Module } from '@nestjs/common';
import { RidesController } from './rides.controller';
import { HttpModule } from '@nestjs/axios';
import { RidesService } from './rides.service';
import { GoogleMapsRouting } from 'src/clients/google/routes-api';
import { PartnerDriversModule } from '@modules/partner-drivers/partner-drivers.module';

@Module({
  imports: [HttpModule, PartnerDriversModule],
  controllers: [RidesController],
  providers: [RidesService, GoogleMapsRouting],
})
export class RidesModule {}
