import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Driver } from './entities/driver.entity';
import { CreateProfileInput } from './dto/create-profile.input';
import { UpdateProfileInput } from './dto/update-profile.input';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Driver) private driverRepository: Repository<Driver>,
  ) {}

  async create(createProfileInput: CreateProfileInput) {
    const { firstName, lastName, email, password, phoneNumber } =
      createProfileInput;

    const driver = new Driver();
    driver.firstName = firstName;
    driver.lastName = lastName;
    driver.email = email;
    driver.phoneNumber = phoneNumber;
    driver.password = password;

    const savedDriver = await this.driverRepository.save(driver);

    return savedDriver;
  }

  findAll(): Promise<Driver[]> {
    return this.driverRepository.find();
  }

  findOneOrAll(id?: number, email?: string): Promise<Driver[]> {
    const fields = { id, email };
    Object.keys(fields).map((key) => {
      if (!fields?.[key]) {
        delete fields?.[key];
      }
      return null;
    });
    if (Object.values(fields).length < 1) {
      return this.driverRepository.find({
        relations: ['vehicles', 'addresses'],
      });
    }
    return this.driverRepository.find({
      where: { ...fields },
      relations: ['vehicles', 'addresses'],
    });
  }

  findOne(id?: number, email?: string) {
    const fields = { id, email };
    Object.keys(fields).map((key) => {
      if (!fields?.[key]) {
        delete fields?.[key];
      }
      return null;
    });
    if (Object.values(fields).length < 1) {
      return this.driverRepository.findOne({
        relations: ['vehicles', 'addresses'],
      });
    }
    return this.driverRepository.findOne({
      where: { ...fields },
      relations: ['vehicles', 'addresses'],
    });
  }

  update(id: number, updateProfileInput: UpdateProfileInput) {
    return `This action updates a #${id} profile`;
  }

  remove(id: number) {
    return `This action removes a #${id} profile`;
  }
}
