import { Interface } from './interface';
import { Module } from './module';
import { Organization } from './organization';
import { User } from './user';

export interface Repository {
  id: number;

  name: string;

  description: string;

  logo: string;

  visibility: boolean;

  creator: User;

  owner: User;

  organization: Organization;

  members: User[];

  modules: Module[];

  interfaces: Interface[];

  createdAt: string;

  updatedAt: string;
}
