import { IsIn, IsNotEmpty, Length } from 'class-validator';

enum LoginType {
  EMAIL = 'email',
  USERNAME = 'username',
}

export class LoginDto {
  username?: string;

  email?: string;

  @IsNotEmpty()
  @Length(8, 20)
  password: string;

  @IsNotEmpty()
  @IsIn([LoginType.EMAIL, LoginType.USERNAME])
  type: 'email' | 'username';
}
