import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { DriverAddress } from './address.entity';
import { DriverDocument } from './driver-document.entity';
import { Vehicle } from './vehicle.entity';

@Entity({ name: 'driver' })
export class Driver {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  phone_number: string;

  @Column({ default: true })
  is_active: boolean;

  @OneToMany(() => Vehicle, (vehicle) => vehicle.driver)
  @JoinColumn()
  vehicles: Vehicle[];

  @OneToMany(() => DriverDocument, (document) => document.driver)
  @JoinColumn()
  driver_documents: DriverDocument[];

  @OneToMany(() => DriverAddress, (address) => address.driver)
  @JoinColumn()
  addresses: DriverAddress[];

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  created_at!: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updated_at!: Date;
}
