import { Review } from '@modules/reviews/review.entity';
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
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column()
  @Generated('uuid')
  uuid: string;

  @Column()
  name: string;

  @Column('text')
  description: string;

  @Column()
  vehicle: string;

  @Column('numeric', { name: 'price_rate' })
  priceRate: number;

  @Column('int', { name: 'minimum_mileage' })
  minimumMileage: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToMany(() => Review, (review) => review.partnerDriver, { cascade: true })
  reviews: Review[];

  @Column('bigint', { name: 'last_review_id', nullable: true })
  lastReviewId: number;
}
