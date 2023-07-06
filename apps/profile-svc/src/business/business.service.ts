import { ConflictException, Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, QueryFailedError } from 'typeorm';
import { BusinessProfile } from './entities/business-profile.entity';
import { UpdateProfileDto } from './dtos/update-profile.dto';
import { CreateBusinessRequestDto } from './dtos/create-business-request.dto';
import { BusinessRequest } from './entities/business-request.entity';
import { CreateBusinessProfileDto } from './dtos/create-business-profile.dto';
import { EBusinessRequestStatus } from '@shifter-shop/dictionary';

@Injectable()
export class BusinessService {
  constructor(
    @InjectRepository(BusinessProfile)
    private readonly businessProfileRepository: Repository<BusinessProfile>,
    @InjectRepository(BusinessRequest)
    private readonly businessRequestRepository: Repository<BusinessRequest>,
  ) {}

  async create(userId: string, data: CreateBusinessProfileDto) {
    const profile = this.businessProfileRepository.create({
      userId,
      ...data,
    });

    return this.businessProfileRepository.save(profile);
  }

  async findById(userId: string) {
    const profile = await this.businessProfileRepository.findOneBy({
      userId,
    });

    if (!profile) {
      throw new NotFoundException(`Profile with id: ${userId} does not exist`);
    }

    return profile;
  }

  async update(userId: string, data: UpdateProfileDto) {
    const res = await this.businessProfileRepository.update({ userId }, data);

    if (!res.affected) {
      throw new NotFoundException(`Product with id: ${userId} does not exist`);
    }
  }

  async createBusinessRequest(userId: string, data: CreateBusinessRequestDto) {
    const requests = await this.businessRequestRepository.find({
      where: { userId },
    });

    const isPending = requests.some(
      (request) => request.status === EBusinessRequestStatus.Pending,
    );

    if (isPending) {
      throw new ConflictException(
        `You already have a pending request. Please wait for the admin to approve it.`,
      );
    }

    const isApproved = requests.some(
      (request) => request.status === EBusinessRequestStatus.Approved,
    );

    if (isApproved) {
      throw new ConflictException(`You already have an approved request.`);
    }

    const request = this.businessRequestRepository.create({
      userId,
      ...data,
    });

    return await this.businessRequestRepository.save(request);
  }

  private isQueryFailedError(
    error: unknown,
  ): error is QueryFailedError & { code: string } {
    return error instanceof QueryFailedError;
  }
}
