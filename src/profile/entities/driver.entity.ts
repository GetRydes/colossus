import { Field, GraphQLISODateTime, Int, ObjectType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty } from 'class-validator';
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
import { DriverDocument } from './document.entity';
import { Vehicle } from 'src/vehicle/entities/vehicle.entity';

@ObjectType()
@Entity({ name: 'driver' })
export class Driver {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @Field()
  @Column({ name: 'first_name' })
  firstName: string;

  @IsNotEmpty()
  @Field()
  @Column({ name: 'last_name' })
  lastName: string;

  @Field()
  @IsEmail()
  @IsNotEmpty()
  @Column({ unique: true })
  email: string;

  @IsNotEmpty()
  @Field()
  @Column()
  password: string;

  @IsNotEmpty()
  @Field()
  @Column({ name: 'phone_number' })
  phoneNumber: string;

  @Field()
  @Column({ default: true, name: 'is_active' })
  isActive: boolean;

  @Field(() => [Vehicle], { nullable: 'itemsAndList' })
  @OneToMany(() => Vehicle, (vehicle) => vehicle.driver)
  @JoinColumn()
  vehicles: Vehicle[];

  @Field(() => [DriverDocument])
  @OneToMany(() => DriverDocument, (document) => document.driver)
  @JoinColumn()
  documents: DriverDocument[];

  @Field(() => [DriverAddress])
  @OneToMany(() => DriverAddress, (address) => address.driver)
  @JoinColumn()
  addresses: DriverAddress[];

  @Field(() => GraphQLISODateTime)
  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    name: 'created_at',
  })
  createdAt: Date;

  @Field(() => GraphQLISODateTime)
  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
    name: 'updated_at',
  })
  updatedAt: Date;
}
