import { Resolver, Mutation, Args, Int } from '@nestjs/graphql';
import { VehicleService } from './vehicle.service';
import { Vehicle } from './entities/vehicle.entity';
import { CreateVehicleInput } from './dto/create-vehicle.input';
import { UpdateVehicleInput } from './dto/update-vehicle.input';

@Resolver(() => Vehicle)
export class VehicleMutationResolver {
  constructor(private readonly vehicleService: VehicleService) {}

  @Mutation(() => Vehicle)
  async createVehicle(
    @Args('createVehicleInput') createVehicleInput: CreateVehicleInput,
  ): Promise<Vehicle> {
    return await this.vehicleService.create(createVehicleInput);
  }

  @Mutation(() => Vehicle)
  updateVehicle(
    @Args('updateVehicleInput') updateVehicleInput: UpdateVehicleInput,
  ) {
    return this.vehicleService.update(
      updateVehicleInput.id,
      updateVehicleInput,
    );
  }

  @Mutation(() => Vehicle)
  removeVehicle(@Args('id', { type: () => Int }) id: number) {
    return this.vehicleService.remove(id);
  }
}
