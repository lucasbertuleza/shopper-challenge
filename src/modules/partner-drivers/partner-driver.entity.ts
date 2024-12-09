import { Review } from '@modules/reviews/review.entity';
import { Ride } from '@modules/rides/ride.entity';
import { Exclude, Expose, Transform } from 'class-transformer';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Generated,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

@Entity()
export class PartnerDriver {
  @Transform(({ value }) => parseInt(value))
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: string;

  @Exclude()
  @Column()
  @Generated('uuid')
  uuid: string;

  @Column()
  name: string;

  @Column('text')
  description: string;

  @Column()
  vehicle: string;

  @Exclude()
  @Column('numeric', { name: 'price_rate', precision: 15, scale: 2 })
  priceRate: number;

  @Exclude()
  @Column('int', { name: 'minimum_mileage' })
  minimumMileage: number;

  @Exclude()
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @Exclude()
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @Exclude()
  @OneToMany(() => Review, (review) => review.partnerDriver, { cascade: true })
  reviews: Review[];

  @Exclude()
  @OneToMany(() => Ride, (ride) => ride.partnerDriver, { cascade: true })
  rides: Ride[];

  @Exclude()
  @Column('bigint', { name: 'last_review_id', nullable: true })
  lastReviewId: number;

  @Expose({ name: 'review' })
  get lastReview() {
    if (!this.reviews) return;
    const { rating, comment } = this.reviews[0];
    return { rating, comment };
  }
}
