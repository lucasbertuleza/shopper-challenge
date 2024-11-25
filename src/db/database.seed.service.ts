import { PartnerDriver } from '@modules/partnerDrivers/partnerDriver.entity';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SeedData } from './database.seed.data';

@Injectable()
export class DatabaseSeedService implements OnModuleInit {
  constructor(
    @InjectRepository(PartnerDriver)
    private partnerDriversRepository: Repository<PartnerDriver>,
  ) {}

  async onModuleInit() {
    await this.populateParterDrivers();
  }

  private async populateParterDrivers() {
    const count = await this.partnerDriversRepository.count();
    if (count !== 0) return;

    SeedData.partnerDrivers.forEach(async (partner) => {
      const newPartner = this.partnerDriversRepository.create(partner);
      newPartner.reviews = partner.reviews;
      await this.partnerDriversRepository.save(newPartner);
      newPartner.lastReviewId = newPartner.reviews.at(0)!.id;
      await this.partnerDriversRepository.save(newPartner);
    });
  }
}
