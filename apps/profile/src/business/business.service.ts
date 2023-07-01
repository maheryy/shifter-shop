import { Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BusinessProfile } from './entities/business-profile.entity';
import { UpdateProfileDto } from './dtos/update-profile.dto';
import { CreateBusinessRequestDto } from './dtos/create-business-request.dto';
import { BusinessRequest } from './entities/business-request.entity';

@Injectable()
export class BusinessService {
  constructor(
    @InjectRepository(BusinessProfile)
    private readonly businessProfileRepository: Repository<BusinessProfile>,
    @InjectRepository(BusinessRequest)
    private readonly businessRequestRepository: Repository<BusinessRequest>,
  ) {}

  async findById(userId: string) {
    const profile = await this.businessProfileRepository.findOneBy({
      id: userId,
    });

    if (!profile) {
      throw new NotFoundException(`Profile with id: ${userId} does not exist`);
    }

    return profile;
  }

  async update(userId: string, data: UpdateProfileDto) {
    const res = await this.businessProfileRepository.update(
      { id: userId },
      data,
    );

    if (!res.affected) {
      throw new NotFoundException(`Product with id: ${userId} does not exist`);
    }
  }

  async createBusinessRequest(userId: string, data: CreateBusinessRequestDto) {
    const request = this.businessRequestRepository.create({
      customerId: userId,
      ...data,
    });
    return this.businessRequestRepository.save(request);
  }
}
