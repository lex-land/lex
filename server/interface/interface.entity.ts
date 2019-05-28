/* eslint-disable @typescript-eslint/no-unused-vars */

import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
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
}

@Entity()
export class Interface {
  // public static METHODS = methods;
  /** hooks */
  // @BeforeCreate
  // @BeforeUpdate
  // @BeforeDelete
  static async deleteCache(instance: Interface) {
    // await RedisService.delCache(
    //   CACHE_KEY.REPOSITORY_GET,
    //   instance.repositoryId
    // );
  }

  // @BeforeBulkCreate
  // @BeforeBulkUpdate
  // @BeforeBulkDelete
  static async bulkDeleteCache(options: any) {
    let id: number = options && options.attributes && options.attributes.id;
    if (!id) {
      id = options.where && +options.where.id;
    }
    if (id) {
      // const itf = await Interface.findById(id);
      // if (itf) {
      //   await RedisService.delCache(CACHE_KEY.REPOSITORY_GET, itf.repositoryId);
      // }
    }
  }

  public request?: object;
  public response?: object;

  // @AutoIncrement
  // @PrimaryKey
  // @Column
  @PrimaryGeneratedColumn()
  id: number;

  // @AllowNull(false)
  @Column({
    type: 'varchar',
    length: 256,
    nullable: false,
  })
  name: string;

  // @AllowNull(false)
  // @Column(DataType.STRING(256))
  @Column({
    type: 'varchar',
    length: 256,
    nullable: false,
  })
  url: string;

  // @AllowNull(false)
  // @Column({
  //   type: DataType.ENUM(methods.GET, methods.POST, methods.PUT, methods.DELETE),
  // })
  @Column({
    comment: 'API method',
    type: 'enum',
    enum: InterfaceMethod,
    nullable: false,
    default: InterfaceMethod.POST,
  })
  method: string;

  // @Column(DataType.TEXT)
  @Column({
    type: 'text',
  })
  description: string;

  // @AllowNull(false)
  // @Default(1)
  // @Column(DataType.BIGINT(11))
  @Column({
    type: 'bigint',
    default: 1,
    nullable: false,
  })
  priority: number;

  // @ForeignKey(() => User)
  // @Column
  // creatorId: number;

  // @ForeignKey(() => User)
  // @Column
  // lockerId: number;

  // @ForeignKey(() => Module)
  // @Column
  // moduleId: number;

  // @ForeignKey(() => Repository)
  // @Column
  // repositoryId: number;

  // @BelongsTo(() => User, 'creatorId')
  @ManyToOne(type => User)
  creator: User;

  // @BelongsTo(() => User, 'lockerId')
  // @ManyToOne(type => Module, module => module.id)
  @ManyToOne(type => User)
  locker: User;

  // @BelongsTo(() => Module, 'moduleId')
  @ManyToOne(type => Module)
  module: Module;

  // @BelongsTo(() => Repository, 'repositoryId')
  @ManyToOne(type => Repository)
  repository: Repository;

  @OneToMany(() => Property, property => property.id)
  properties: Property[];
}
