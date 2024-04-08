import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../user/entities/user.entity';
import { Repository } from 'typeorm';
import { UserService } from '../user/user.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  register(user: RegisterDto) {
    const data = {
      ...user,
      phone: user.phone.join(','),
    };
    return this.userRepository.save(this.userRepository.create(data));
  }

  async login(loginDto: LoginDto) {
    const user =
      loginDto.type === 'username'
        ? await this.userService.getUserByUsername(loginDto.username)
        : await this.userService.getUserByEmail(loginDto.email);
    if (!user) {
      throw new UnauthorizedException('User is not exists');
    }
    const isValid = bcrypt.compareSync(loginDto.password, user.password);
    if (!isValid) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload = { sub: user.id, username: user.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
