import { Organization } from '../organization.entity';
import { User } from '../../user/user.entity';

export interface PostOrgPayload {
  name: string;
  description: string;
  members: number[];
}

export interface OrganizationQuery {
  organizations: Organization[];
  users: User[];
}
