import { ConflictException, Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, QueryFailedError } from 'typeorm';
import { BusinessProfile } from './entities/business-profile.entity';
import { UpdateProfileDto } from './dtos/update-profile.dto';
import { CreateBusinessRequestDto } from './dtos/create-business-request.dto';
import { BusinessRequest } from './entities/business-request.entity';
import { CreateBusinessProfileDto } from './dtos/create-business-profile.dto';
import {
  EBusinessRequestStatus,
  EService,
  EUserRole,
  TUser,
} from '@shifter-shop/dictionary';
import { UpdateBusinessRequestDto } from './dtos/update-request';
import { fetchJson } from '@shifter-shop/helpers';

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

  async findBusinessRequestById(businessRequestId: string) {
    const request = await this.businessRequestRepository.findOneBy({
      id: businessRequestId,
    });

    return request;
  }

  async update(userId: string, data: UpdateProfileDto) {
    const res = await this.businessProfileRepository.update({ userId }, data);

    if (!res.affected) {
      throw new NotFoundException(`Product with id: ${userId} does not exist`);
    }
  }

  async updateBusinessRequestStatus(
    businessRequestId: string,
    data: UpdateBusinessRequestDto,
    userRole: string,
  ) {
    const res = await this.businessRequestRepository.update(
      businessRequestId,
      data,
    );

    if (data && data.status === EBusinessRequestStatus.Approved) {
      const business = await this.businessRequestRepository.findOneBy({
        id: businessRequestId,
      });

      await fetchJson<TUser>(
        { service: EService.User, endpoint: `/${business?.userId}` },
        {
          headers: {
            'user-role': userRole,
          },
          method: 'PATCH',
          data: {
            role: EUserRole.Seller,
          },
        },
      );
    }

    if (!res.affected) {
      throw new NotFoundException(
        `Business request with id: ${businessRequestId} does not exist`,
      );
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

  async findBusinessRequests(status?: EBusinessRequestStatus) {
    if (status) {
      return await this.businessRequestRepository.find({
        where: { status },
      });
    }

    return await this.businessRequestRepository.find();
  }

  private isQueryFailedError(
    error: unknown,
  ): error is QueryFailedError & { code: string } {
    return error instanceof QueryFailedError;
  }
}
