import { Module } from '@nestjs/common';
import { VehicleService } from './vehicle.service';
import { VehicleResolver } from './vehicle.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vehicle } from './entities/vehicle.entity';
import { Driver } from 'src/profile/entities/driver.entity';
import { VehicleQueryResolver } from './vehicle.query';
import { VehicleMutationResolver } from './vehicle.mutation';

@Module({
  providers: [
    VehicleResolver,
    VehicleService,
    VehicleQueryResolver,
    VehicleMutationResolver,
  ],
  imports: [TypeOrmModule.forFeature([Vehicle, Driver])],
  exports: [VehicleService],
})
export class VehicleModule {}
