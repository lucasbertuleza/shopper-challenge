import { Module } from '@nestjs/common';
import { RidesController } from './rides.controller';
import { HttpModule } from '@nestjs/axios';
import { RidesService } from './rides.service';
import { GoogleMapsRouting } from 'src/clients/google/routes-api';
import { PartnerDriversModule } from '@modules/partner-drivers/partner-drivers.module';
import { DriverNotFoundConstraint, InvalidDistanceConstraint } from './ride-corfirm.constraints';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ride } from './ride.entity';

@Module({
  imports: [HttpModule, PartnerDriversModule, TypeOrmModule.forFeature([Ride])],
  controllers: [RidesController],
  providers: [RidesService, GoogleMapsRouting, DriverNotFoundConstraint, InvalidDistanceConstraint],
})
export class RidesModule {}
