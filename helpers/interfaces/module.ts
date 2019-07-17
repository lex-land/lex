import { Interface } from './interface';
import { Repository } from './repository';
import { User } from './user';

export interface Module {
  id: number;
  name: string;
  description: string;
  creator: User;
  repository: Repository;
  interfaces: Interface[];
  createdAt: string;
  updatedAt: string;
}
