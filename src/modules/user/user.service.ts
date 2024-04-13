import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/modules/user/entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async findAll(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }

  async getUserByUsername(username: string): Promise<UserEntity> {
    return await this.userRepository.findOneBy({ username });
  }

  async getUserByEmail(email: string): Promise<UserEntity> {
    return await this.userRepository.findOneBy({ email });
  }

  async update(id: number, user: UserEntity): Promise<UserEntity> {
    await this.userRepository.update(id, user);
    return this.userRepository.findOneBy({ id });
  }

  async delete(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
}
