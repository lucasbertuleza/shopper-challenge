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

  findAvailablesFromDistance(distance: number): Promise<PartnerDriver[]> {
    return this.partnerDriversRepository
      .createQueryBuilder('driver')
      .select(['driver.id AS id', 'name', 'description', 'vehicle', 'rating', 'comment'])
      .innerJoin('driver.reviews', 'review', 'review.id = driver.last_review_id')
      .where({ minimumMileage: LessThanOrEqual(distance) })
      .orderBy('price_rate', 'ASC')
      .getRawMany();
  }
}
