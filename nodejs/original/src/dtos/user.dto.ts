import { IsEmail, IsString, Length, IsOptional } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @Length(3, 50)
  username: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;
}

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @Length(3, 50)
  username?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  password?: string;
}