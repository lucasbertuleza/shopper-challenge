import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, LessThanOrEqual } from 'typeorm';
import { PartnerDriver } from './partnerDriver.entity';

@Injectable()
export class PartnerDriversService {
  constructor(
    @InjectRepository(PartnerDriver)
    private partnerDriversRepository: Repository<PartnerDriver>,
  ) {}

  findAll(): Promise<PartnerDriver[]> {
    return this.partnerDriversRepository.find();
  }

  findAvailablesFromMileage(mileage: number): Promise<PartnerDriver[]> {
    return this.partnerDriversRepository.find({
      where: { minimumMileage: LessThanOrEqual(mileage) },
      order: { priceRate: 'ASC' },
    });
  }
}
