import { Organization } from './organization';
import { Repository } from './repository';

export interface User {
  id: number;

  fullname: string;

  password: string;

  email: string;

  // OneToMany总是反向的，并且总是与ManyToOne成对出现
  // 在ManyToOne/OneToMany关系中，拥有者一边总是ManyToOne。译者注：拥有外键者即关系拥有者
  ownedOrganizations: Organization[];

  joinedOrganizations: Organization[];

  // OneToMany总是反向的，并且总是与ManyToOne成对出现
  // 在ManyToOne/OneToMany关系中，拥有者一边总是ManyToOne。译者注：拥有外键者即关系拥有者
  ownedRepositories: Repository[];

  joinedRepositories: Repository[]; // 初始化个Repository数组
}
