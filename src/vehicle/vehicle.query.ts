import { Resolver, Query, Args, Int } from '@nestjs/graphql';
import { VehicleService } from './vehicle.service';
import { Vehicle } from './entities/vehicle.entity';

@Resolver(() => Vehicle)
export class VehicleQueryResolver {
  constructor(private readonly vehicleService: VehicleService) {}

  @Query(() => [Vehicle], { name: 'vehicles' })
  findOneOrAll() {
    return this.vehicleService.findAll();
  }

  @Query(() => Vehicle, { name: 'vehicle', nullable: true })
  async findOne(@Args('id', { type: () => Int }) id: number) {
    return await this.vehicleService.findOne(id);
  }
}
