import { Body, ConflictException, Controller, Post } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    const existingUserByUsername = await this.userService.getUserByUsername(
      registerDto.username,
    );
    const existingUserByEmail = await this.userService.getUserByEmail(
      registerDto.email,
    );

    if (!!existingUserByUsername) {
      throw new ConflictException('Username already exists');
    }

    if (!!existingUserByEmail) {
      throw new ConflictException('Email already exists');
    }
    return this.authService.register(registerDto);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
}
