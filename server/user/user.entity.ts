import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { Organization } from '../organization/organization.entity';
import { Repository } from '../repository/repository.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 32,
  })
  fullname: string;

  @Exclude()
  @Column({
    type: 'varchar',
    length: 32,
  })
  password: string;

  @Column({
    type: 'varchar',
    length: 128,
    nullable: false,
    unique: true,
  })
  email: string;

  @OneToMany(() => Organization, organization => organization.owner)
  // OneToMany总是反向的，并且总是与ManyToOne成对出现
  // 在ManyToOne/OneToMany关系中，拥有者一边总是ManyToOne。译者注：拥有外键者即关系拥有者
  ownedOrganizations: Organization[];

  @ManyToMany(() => Organization, organization => organization.members)
  joinedOrganizations: Organization[];

  @OneToMany(() => Repository, repository => repository.owner)
  // OneToMany总是反向的，并且总是与ManyToOne成对出现
  // 在ManyToOne/OneToMany关系中，拥有者一边总是ManyToOne。译者注：拥有外键者即关系拥有者
  ownedRepositories: Repository[];

  @ManyToMany(() => Repository, repository => repository.members)
  joinedRepositories: Repository[]; // 初始化个Repository数组
}
