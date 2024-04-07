// user.service.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersEntity } from 'src/modules/users/entities/users.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly userRepository: Repository<UsersEntity>,
  ) {}

  async findAll(): Promise<UsersEntity[]> {
    return this.userRepository.find();
  }

  async findById(id: number): Promise<UsersEntity> {
    return this.userRepository.findOneBy({ id });
  }

  async create(user: CreateUserDto) {
    const data = {
      ...user,
      phone: user.phone.join(','),
    };
    return this.userRepository.save(this.userRepository.create(data));
  }

  async update(id: number, user: UsersEntity): Promise<UsersEntity> {
    await this.userRepository.update(id, user);
    return this.userRepository.findOneBy({ id });
  }

  async delete(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
}
