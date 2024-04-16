import { Controller, Get, Res, UseGuards, Version } from '@nestjs/common';
import { UserService } from './user.service';
import { UserEntity } from './entities/user.entity';
import { AuthGuard } from '../auth/auth.guard';
import { Response } from 'express';
import { Cookies } from '../../decorators/cookies/cookies.decorator';

@Controller('users')
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @UseGuards(AuthGuard)
  @Get()
  getAll(): Promise<UserEntity[]> {
    return this.usersService.findAll();
  }

  @Version('1')
  @Get('noauth')
  v1(): string {
    return 'v1';
  }

  @Version('2')
  @Get('noauth')
  v2(): string {
    return 'v2';
  }

  @Get('cook')
  findAll(@Res({ passthrough: true }) response: Response) {
    response.cookie('key', 'value');
  }

  @Get('fk')
  asd(@Cookies('key') key: string) {
    console.log(key);
  }
}
