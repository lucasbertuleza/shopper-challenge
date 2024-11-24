import { PartnerDriver } from '@modules/partnerDrivers/partnerDriver.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
} from 'typeorm';

export type Grade = 1 | 2 | 3 | 4 | 5;
export const MAX_GRADE = 5;
export const MIN_GRADE = 1;

@Entity()
export class Rating {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: BigInteger;

  @Column({ type: 'enum', enum: [1, 2, 3, 4, 5] })
  grade: Grade;

  @Column()
  comment: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => PartnerDriver, (partnerDriver) => partnerDriver.ratings)
  @JoinColumn({ name: 'partner_driver_id' })
  partnerDriver: PartnerDriver;
}
