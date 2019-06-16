import { IsNotEmpty } from 'class-validator';

export class CreateIntefaceDto {
  @IsNotEmpty()
  method: string;
  @IsNotEmpty()
  url: string;
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  description: string;
}
