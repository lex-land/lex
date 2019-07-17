import { Interface } from './Interface';
import { Repository } from './Repository';
import { User } from './User';

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
