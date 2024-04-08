import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { UserEntity } from './entities/user.entity';

@Controller('users')
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @Get()
  getHello(): Promise<UserEntity[]> {
    return this.usersService.findAll();
  }
}
