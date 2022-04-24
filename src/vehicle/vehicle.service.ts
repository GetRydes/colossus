import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Driver } from 'src/profile/entities/driver.entity';
import { Repository } from 'typeorm';
import { CreateVehicleInput } from './dto/create-vehicle.input';
import { UpdateVehicleInput } from './dto/update-vehicle.input';
import { Vehicle } from './entities/vehicle.entity';

@Injectable()
export class VehicleService {
  constructor(
    @InjectRepository(Vehicle) private vehicleRepository: Repository<Vehicle>,
    @InjectRepository(Driver) private driverRepository: Repository<Driver>,
  ) {}

  async create(createVehicleInput: CreateVehicleInput): Promise<Vehicle> {
    const {
      chasis_number,
      color,
      driver,
      model_type,
      manufacturer,
      plate_number,
      year_of_make,
    } = createVehicleInput;

    const driverData = await this.driverRepository.findOne(driver);

    if (!driverData) return null;

    const vehicle = new Vehicle();
    vehicle.chasis_number = chasis_number;
    vehicle.color = color;
    vehicle.driver = driverData;
    vehicle.model_type = model_type;
    vehicle.manufacturer = manufacturer;
    vehicle.plate_number = plate_number;
    vehicle.year_of_make = year_of_make;

    const savedVehicle = await this.vehicleRepository.save(vehicle);

    return savedVehicle;
  }

  findAll() {
    return `This action returns all vehicle`;
  }

  async findOneOrAll({
    id,
    driver,
  }: {
    id?: number;
    driver?: number;
  }): Promise<Vehicle[]> {
    const fields = { id, driver };
    Object.keys(fields).map((key) => {
      if (!fields?.[key]) {
        delete fields?.[key];
      }
      return null;
    });
    if (Object.values(fields).length < 1) {
      return this.vehicleRepository.find({
        relations: ['driver'],
      });
    }
    return this.vehicleRepository.find({
      where: { ...fields },
      relations: ['driver'],
    });
  }

  async findOne(id: number): Promise<Vehicle | null> {
    const retrievedVehicle = await this.vehicleRepository.findOne(id);

    if (!retrievedVehicle) return null;

    return retrievedVehicle;
  }

  update(id: number, updateVehicleInput: UpdateVehicleInput) {
    return `This action updates a #${id} vehicle`;
  }

  remove(id: number) {
    return `This action removes a #${id} vehicle`;
  }
}
