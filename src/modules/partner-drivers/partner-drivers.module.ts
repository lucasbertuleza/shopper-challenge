import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PartnerDriver } from './partner-driver.entity';
import { PartnerDriversService } from './partner-drivers.service';

@Module({
  imports: [TypeOrmModule.forFeature([PartnerDriver])],
  exports: [TypeOrmModule, PartnerDriversService],
  providers: [PartnerDriversService],
})
export class PartnerDriversModule {}
