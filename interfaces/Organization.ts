import { Repository } from './Repository';
import { User } from './User';

export interface Organization {
  id: number;

  name: string;

  description: string;

  logo: string;

  visibility: boolean;

  // ManyToOne 会为实体创建一个creatorId列
  creator: User;

  // JoinColumn 会为实体创建一个creatorId列
  owner: User;

  // @JoinTable多对多关系拥有者必须指定的
  members: User[];

  repositories: Repository[];
}
