import { IsNotEmpty, Length } from 'class-validator';

export class RegisterDto {
  @IsNotEmpty()
  @Length(8, 20)
  username: string;

  email: string;

  @IsNotEmpty()
  phone: number[];

  @IsNotEmpty()
  @Length(8, 20)
  password: string;
}
