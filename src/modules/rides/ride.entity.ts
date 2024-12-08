import { PartnerDriver } from '@modules/partner-drivers/partner-driver.entity';
import { Exclude, Expose, Transform } from 'class-transformer';
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

  @Exclude()
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

  @Transform(({ value }) => parseFloat(value))
  @Column('numeric', { precision: 15, scale: 10 })
  value: number;

  @Exclude()
  @ManyToOne(() => PartnerDriver, (partnerDriver) => partnerDriver.rides, { nullable: false })
  @JoinColumn({ name: 'partner_driver_id' })
  partnerDriver: PartnerDriver;

  @Expose({ name: 'date' })
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @Exclude()
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @Expose()
  get driver() {
    if (!this.partnerDriver) return;
    return { id: parseInt(this.partnerDriver.id), name: this.partnerDriver.name };
  }
}
