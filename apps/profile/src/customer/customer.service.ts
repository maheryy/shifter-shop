import { Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CustomerProfile } from './entities/customer-profile.entity';
import { UpdateProfileDto } from './dtos/update-profile.dto';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(CustomerProfile)
    private readonly customerProfileRepository: Repository<CustomerProfile>,
  ) {}

  async create(userId: string) {
    const profile = this.customerProfileRepository.create({ id: userId });
    await this.customerProfileRepository.save(profile);

    return profile;
  }

  async findById(id: string) {
    const profile = await this.customerProfileRepository.findOneBy({ id });

    if (!profile) {
      throw new NotFoundException(`Profile with id: ${id} does not exist`);
    }

    return profile;
  }

  async update(id: string, data: UpdateProfileDto) {
    const res = await this.customerProfileRepository.update({ id }, data);

    if (!res.affected) {
      throw new NotFoundException(`Product with id: ${id} does not exist`);
    }
  }
}
