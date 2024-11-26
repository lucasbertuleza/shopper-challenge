import { PartnerDriver } from '@modules/partner-drivers/partner-driver.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  Check,
} from 'typeorm';

export const MAX_RATING = 5;
export const MIN_RATING = 1;

@Entity()
@Check('rating in (1,2,3,4,5)')
export class Review {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column('smallint')
  rating: number;

  @Column()
  comment: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => PartnerDriver, (partnerDriver) => partnerDriver.reviews, { nullable: false })
  @JoinColumn({ name: 'partner_driver_id' })
  partnerDriver: PartnerDriver;
}
