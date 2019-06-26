import { CreateModuDto } from '@server/module/dto/create-modu.dto';
import { IsNotEmpty } from 'class-validator';

export class MigrateRepoDto {
  name: string;
  description: string;

  @IsNotEmpty()
  modules: CreateModuDto[];
}
