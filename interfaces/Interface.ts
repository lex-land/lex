import { Module } from './Module';
import { Property } from './property';
import { Repository } from './Repository';
import { User } from './User';

export enum InterfaceMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
  PATCH = 'PATCH',
}

export interface Interface {
  id: number;
  name: string;
  url: string;
  method: string;
  description: string;
  creator: User;
  locker: User;
  module: Module;
  repository: Repository;
  properties: Property[];
  createdAt: string;
  updatedAt: string;
}
