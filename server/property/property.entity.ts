import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Interface } from '../interface/interface.entity';
import { Module } from '../module/module.entity';
import { Repository } from '../repository/repository.entity';
import { User } from '../user/user.entity';

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

// https://typeorm.io/#/tree-entities/adjacency-list
@Entity()
export class Property {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: SCOPES,
    nullable: false,
    default: SCOPES.RESPONSE,
    comment: 'property owner',
  })
  scope: string;

  @Column({
    type: 'enum',
    enum: TYPES,
    nullable: false,
    comment: 'property type',
  })
  type: string;

  @Column({
    type: 'varchar',
    length: 256,
    nullable: false,
  })
  name: string;

  @Column({
    type: 'varchar',
    length: 128,
    comment: 'mock rules',
    default: '5',
    nullable: true,
  })
  rule: string;

  @Column({
    type: 'text',
    comment: 'value of this property',
  })
  default: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  description: string;

  @ManyToOne(() => User)
  creator: User;

  @ManyToOne(() => Interface, _interface => _interface.properties, {
    onDelete: 'CASCADE',
  })
  interface: Interface;

  @ManyToOne(() => Module, {
    onDelete: 'CASCADE',
  })
  module: Module;

  @ManyToOne(() => Repository)
  repository: Repository;

  @OneToMany(() => Property, prop => prop.parent)
  children: Property[];

  @ManyToOne(() => Property, prop => prop.children, {
    onDelete: 'CASCADE',
  })
  parent: Property;

  @Column({
    type: 'bool',
    default: false,
  })
  required: boolean;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;
}
