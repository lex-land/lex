import { IsNotEmpty } from 'class-validator';
// import { User } from '@server/user/user.entity';

export class CreateOrgDto {
  @IsNotEmpty()
  readonly name: string;
  @IsNotEmpty()
  readonly description: string;
}
