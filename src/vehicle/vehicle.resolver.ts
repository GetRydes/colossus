import { Resolver } from '@nestjs/graphql';
import { VehicleService } from './vehicle.service';
import { Vehicle } from './entities/vehicle.entity';

@Resolver(() => Vehicle)
export class VehicleResolver {
  constructor(private readonly vehicleService: VehicleService) {}
}
