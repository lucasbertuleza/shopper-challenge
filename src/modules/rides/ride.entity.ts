import { PartnerDriver } from '@modules/partner-drivers/partner-driver.entity';
import { Exclude, Transform } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Ride {
  @Transform(({ value }) => parseInt(value))
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Exclude()
  @Column()
  @Generated('uuid')
  uuid: string;

  @Column({ name: 'customer_id' })
  customerId: string;

  @Column()
  origin: string;

  @Column()
  destination: string;

  @Column('int')
  distance: number;

  @Column()
  duration: string;

  @Column('numeric', { precision: 15, scale: 10 })
  value: number;

  @ManyToOne(() => PartnerDriver, (partnerDriver) => partnerDriver.rides, { nullable: false })
  @JoinColumn({ name: 'partner_driver_id' })
  partnerDriver: PartnerDriver;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
