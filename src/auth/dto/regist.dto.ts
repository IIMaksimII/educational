import { IsString, IsEmail, Length } from 'class-validator';

export class RegisterDto {
  @IsString()
  @Length(4, 20)
  username!: string;

  @IsEmail()
  email!: string;

  @IsString()
  @Length(6, 20)
  password!: string;
}