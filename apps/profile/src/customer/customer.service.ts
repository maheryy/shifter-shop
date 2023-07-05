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
    const profile = this.customerProfileRepository.create({ userId });
    await this.customerProfileRepository.save(profile);

    return profile;
  }

  async findById(userId: string) {
    const profile = await this.customerProfileRepository.findOneBy({ userId });

    if (!profile) {
      throw new NotFoundException(`Profile with id: ${userId} does not exist`);
    }

    return profile;
  }

  async update(userId: string, data: UpdateProfileDto) {
    const res = await this.customerProfileRepository.update({ userId }, data);

    if (!res.affected) {
      throw new NotFoundException(`Product with id: ${userId} does not exist`);
    }
  }
}
