import { PartnerDriver } from '@modules/partnerDrivers/partnerDriver.entity';
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

export const MAX_GRADE = 5;
export const MIN_GRADE = 1;

@Entity()
@Check('grade in (1,2,3,4,5)')
export class Rating {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: BigInteger;

  @Column('smallint')
  grade: number;

  @Column()
  comment: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => PartnerDriver, (partnerDriver) => partnerDriver.ratings, { nullable: false })
  @JoinColumn({ name: 'partner_driver_id' })
  partnerDriver: PartnerDriver;
}
