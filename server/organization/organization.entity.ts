import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Repository } from '../repository/repository.entity';
import { User } from '../user/user.entity';

@Entity()
export class Organization {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: false,
    type: 'varchar',
    length: 20,
    unique: true,
  })
  name: string;

  @Column({
    type: 'text',
  })
  description: string;

  @Column({
    type: 'varchar',
    length: 256,
    default: 'https://work.alibaba-inc.com/photo/undefined.220x220.jpg',
  })
  logo: string;

  @Column({
    nullable: false,
    default: true,
    comment: 'true:public, false:private',
  })
  visibility: boolean;

  // ManyToOne 会为实体创建一个creatorId列
  @ManyToOne(() => User)
  creator: User;

  // JoinColumn 会为实体创建一个creatorId列
  @ManyToOne(() => User, user => user.ownedOrganizations)
  owner: User;

  @ManyToMany(() => User, user => user.joinedOrganizations)
  // @JoinTable多对多关系拥有者必须指定的
  @JoinTable()
  members: User[];

  @OneToMany(() => Repository, repository => repository.organization)
  repositories: Repository[];
}
