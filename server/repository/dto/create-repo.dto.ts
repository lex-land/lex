import { User } from '@server/user/user.entity';

export class CreateRepositoryDto {
  readonly name: string;
  readonly description: string;
  readonly members?: User[];
  readonly creator?: User;
  readonly owner?: User;
}
