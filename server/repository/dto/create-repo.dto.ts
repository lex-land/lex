import { User } from '@src/user/user.entity';

export class CreateRepositoryDto {
  readonly name: string;
  readonly description: string;
  readonly members: Partial<User>[];
  readonly creator: User;
  readonly owner: User;
}
