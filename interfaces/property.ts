import { Interface } from './Interface';
import { Module } from './Module';
import { Repository } from './Repository';
import { User } from './User';

export enum SCOPES {
  REQUEST = 'request',
  RESPONSE = 'response',
}

export enum TYPES {
  STRING = 'String',
  NUMBER = 'Number',
  BOOLEAN = 'Boolean',
  OBJECT = 'Object',
  ARRAY = 'Array',
  FUNCTION = 'Function',
  REGEXP = 'RegExp',
}

export interface Property {
  id: number;
  scope: string;
  type: string;
  name: string;
  rule: string;
  default: string;
  description: string;
  creator: User;
  interface: Interface;
  module: Module;
  repository: Repository;
  children: Property[];
  parent: Property;
  required: boolean;
  createdAt: string;
  updatedAt: string;
}
