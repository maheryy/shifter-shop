import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { QueryFailedError, Repository, TypeORMError } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateUserDto } from './dtos/update-user.dto';
import { SearchCritieriaDto } from './dtos/search-criteria.dto';
import amqp from 'src/lib/amqp';
import { EQueue } from '@shifter-shop/amqp';

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
      await amqp.publishToQueue(EQueue.UserRegistered, user);
      return userInstance;
    } catch (error) {
      if (error instanceof TypeORMError && error.message.includes('duplicate')) {
          throw new ConflictException("Email already exists");
      }

      throw error;
    }
  }

  async findAll() {
    return this.usersRepository.find();
  }

  async findOneById(id: string) {
    const user = await this.usersRepository.findOneBy({ id });

    if (!user) {
      throw new NotFoundException(`User with id: ${id} does not exist`);
    }

    return user;
  }

  async searchOne(criteria: SearchCritieriaDto) {
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
    const res = await this.usersRepository.update({ id }, data);
    
    if (!res.affected) {
      throw new NotFoundException(`User with id: ${id} does not exist`);
    }
  }
}
