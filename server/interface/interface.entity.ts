import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Module } from '../module/module.entity';
import { Property } from '../property/property.entity';
import { Repository } from '../repository/repository.entity';
import { User } from '../user/user.entity';

enum InterfaceMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
  PATCH = 'PATCH',
}

@Entity()
export class Interface {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 256,
    nullable: false,
  })
  name: string;

  @Column({
    type: 'varchar',
    length: 256,
    nullable: false,
  })
  url: string;

  @Column({
    comment: 'API method',
    type: 'enum',
    enum: InterfaceMethod,
    nullable: false,
    default: InterfaceMethod.POST,
  })
  method: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  description: string;

  @ManyToOne(() => User)
  creator: User;

  @ManyToOne(() => User)
  locker: User;

  @ManyToOne(() => Module, {
    onDelete: 'CASCADE',
  })
  module: Module;

  @ManyToOne(() => Repository)
  repository: Repository;

  @OneToMany(() => Property, prop => prop.interface)
  properties: Property[];

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;
}
