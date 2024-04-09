import { Controller, Get, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UserEntity } from './entities/user.entity';
import { AuthGuard } from '../auth/auth.guard';

@Controller('users')
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @UseGuards(AuthGuard)
  @Get()
  getAll(): Promise<UserEntity[]> {
    return this.usersService.findAll();
  }
}
