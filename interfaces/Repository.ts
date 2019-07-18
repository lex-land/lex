import { Interface } from './Interface';
import { Module } from './Module';
import { Organization } from './Organization';
import { User } from './User';

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
