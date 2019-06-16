import { IsNotEmpty } from 'class-validator';

export class CreateRepositoryDto {
  @IsNotEmpty()
  readonly name: string;
  @IsNotEmpty()
  readonly description: string;
}
