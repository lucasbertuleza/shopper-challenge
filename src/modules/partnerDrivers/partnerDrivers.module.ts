import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PartnerDriver } from './partnerDriver.entity';
import { PartnerDriversService } from './partnerDrivers.service';

@Module({
  imports: [TypeOrmModule.forFeature([PartnerDriver])],
  exports: [TypeOrmModule, PartnerDriversService],
  providers: [PartnerDriversService],
})
export class PartnerDriversModule {}
