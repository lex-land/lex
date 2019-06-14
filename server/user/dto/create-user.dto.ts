import { IsEmail, IsNotEmpty } from 'class-validator';
export class CreateUserDto {
  @IsNotEmpty()
  readonly fullname: string;
  @IsEmail()
  readonly email: string;
  @IsNotEmpty()
  readonly password: string;
}
