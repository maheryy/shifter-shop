import {
  ConflictException,
  Injectable,
  BadRequestException,
} from '@nestjs/common';
import { NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { Repository, TypeORMError } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateUserDto } from './dtos/update-user.dto';
import { SearchCriteriaDto } from './dtos/search-criteria.dto';
import amqp from 'src/lib/amqp';
import { EQueue } from '@shifter-shop/amqp';
import { TCustomerProfile, EService } from '@shifter-shop/dictionary';
import { fetchJson } from '@shifter-shop/helpers';
import { EUserRole } from '@shifter-shop/dictionary';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async create(data: CreateUserDto) {
    try {
      const userInstance = this.usersRepository.create(data);
      const user = await this.usersRepository.save(userInstance);

      await Promise.all([
        amqp.publishToQueue(EQueue.UserRegistered, user),
        fetchJson<TCustomerProfile>(
          { service: EService.Profile, endpoint: '/customer' },
          { method: 'POST', data: { userId: user.id } },
        ),
      ]);

      return userInstance;
    } catch (error) {
      if (
        error instanceof TypeORMError &&
        error.message.includes('duplicate')
      ) {
        throw new ConflictException('Email already exists');
      }

      throw error;
    }
  }

  async findAll(type?: string) {
    if (
      type &&
      !Object.values(EUserRole).includes(type.toUpperCase() as EUserRole)
    ) {
      throw new BadRequestException(`Invalid type: ${type}`);
    }

    const role = type?.toUpperCase() as EUserRole;
    return this.usersRepository.find({ where: { role: role } });
  }

  async count(type?: string) {
    if (
      type &&
      !Object.values(EUserRole).includes(type.toUpperCase() as EUserRole)
    ) {
      throw new BadRequestException(`Invalid type: ${type}`);
    }

    const role = type?.toUpperCase() as EUserRole;
    return this.usersRepository.count({ where: { role: role } });
  }

  async findOneById(id: string) {
    const user = await this.usersRepository.findOneBy({ id });

    if (!user) {
      throw new NotFoundException(`User with id: ${id} does not exist`);
    }

    return user;
  }

  async searchOne(criteria: SearchCriteriaDto) {
    const user = await this.usersRepository.findOneBy(criteria);

    if (!user) {
      throw new NotFoundException(`User not found`);
    }

    return user;
  }

  async findOneByEmail(email: string) {
    const user = await this.usersRepository.findOneBy({ email });

    if (!user) {
      throw new NotFoundException(`User with email: ${email} does not exist`);
    }

    return user;
  }

  async update(id: string, data: UpdateUserDto) {
    const result = await this.usersRepository.update({ id }, data);

    if (!result.affected) {
      throw new NotFoundException(`User with id: ${id} does not exist`);
    }

    return this.findOneById(id);
  }
}
