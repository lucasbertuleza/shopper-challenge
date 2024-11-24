import { Rating } from '@modules/ratings/rating.entity';
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
  id: BigInteger;

  @Column()
  @Generated('uuid')
  uuid: string;

  @Column()
  name: string;

  @Column('text')
  description: string;

  @Column()
  car: string;

  @Column('numeric', { name: 'price_rate' })
  priceRate: number;

  @Column('int', { name: 'minimum_mileage' })
  minimumMileage: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToMany(() => Rating, (rating) => rating.partnerDriver, { cascade: true })
  ratings: Rating[];
}
