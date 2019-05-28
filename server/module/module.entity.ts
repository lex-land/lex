/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Interface } from '../interface/interface.entity';
import { Repository } from '../repository/repository.entity';
import { User } from '../user/user.entity';

@Entity()
export class Module {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 256,
    nullable: false,
  })
  name: string;

  @Column({
    type: 'text',
    nullable: false,
  })
  description: string;

  @Column({
    type: 'bigint',
    default: 1,
    nullable: false,
  })
  priority: number;

  @ManyToOne(type => User)
  creator: User;

  @ManyToOne(type => Repository)
  repository: Repository;

  @OneToMany(() => Interface, _interface => _interface.module)
  interfaces: Interface[];
}
