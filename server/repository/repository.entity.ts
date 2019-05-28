/* eslint-disable @typescript-eslint/no-unused-vars */

import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Interface } from '../interface/interface.entity';
import { Module } from '../module/module.entity';
import { Organization } from '../organization/organization.entity';
import { User } from '../user/user.entity';

@Entity()
export class Repository {
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
    type: 'varchar',
    default: 'https://work.alibaba-inc.com/photo/undefined.220x220.jpg',
    length: 256,
  })
  logo: string;

  @Column({
    default: true,
    comment: 'true:public, false:private',
    nullable: false,
  })
  visibility: boolean;

  @ManyToOne(type => User)
  creator: User;

  @ManyToOne(type => User, user => user.ownedRepositories)
  owner: User;

  //   // @BelongsTo(() => Organization, 'organizationId')
  @ManyToOne(type => Organization, organization => organization.repositories)
  organization: Organization;

  @ManyToMany(type => User, user => user.joinedRepositories)
  @JoinTable()
  members: User[];

  // @HasMany(() => Module, 'repositoryId')
  @OneToMany(type => Module, module => module.repository)
  modules: Module[];

  //   // @HasMany(() => Module, 'repositoryId')
  @OneToMany(type => Interface, _interface => _interface.repository)
  interfaces: Interface[];

  //   // @BelongsToMany(
  //   //   () => Repository,
  //   //   () => RepositoriesCollaborators,
  //   //   'repositoryId',
  //   //   'collaboratorId'
  //   // )
  //   collaborators: User[];
}
