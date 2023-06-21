import { Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateUserDto } from './dtos/update-user.dto';
import { SearchCritieriaDto } from './dtos/search-criteria.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async create(data: CreateUserDto) {
    const user = this.usersRepository.create(data);
    return this.usersRepository.save(user);
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
