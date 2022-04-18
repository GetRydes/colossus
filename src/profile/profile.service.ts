import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Driver } from 'src/data-access/entities/driver.entity';
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
    driver.first_name = firstName;
    driver.last_name = lastName;
    driver.email = email;
    driver.password = password;
    driver.phone_number = phoneNumber;

    const savedDriver = await this.driverRepository.save(driver);

    return {
      firstName: savedDriver.first_name,
      email: savedDriver.email,
      id: savedDriver.id,
      lastName: savedDriver.last_name,
      phoneNumber: savedDriver.phone_number,
      isActive: savedDriver.is_active,
    };
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
      return this.driverRepository.find();
    }
    return this.driverRepository.find({ where: { ...fields } });
  }

  findOne(id: number) {
    return `This action returns a #${id} profile`;
  }

  update(id: number, updateProfileInput: UpdateProfileInput) {
    return `This action updates a #${id} profile`;
  }

  remove(id: number) {
    return `This action removes a #${id} profile`;
  }
}
