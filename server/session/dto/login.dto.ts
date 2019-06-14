import { IsNotEmpty } from 'class-validator';

export class LoginDto {
  @IsNotEmpty()
  readonly username: string;
  @IsNotEmpty()
  readonly password: string;
}
