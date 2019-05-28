import { Repository } from '@src/repository/repository.entity';

export class CreateModuDto {
  repository: Partial<Repository>;
  name: string;
  description: string;
}
