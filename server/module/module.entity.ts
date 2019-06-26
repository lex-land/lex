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
    nullable: true,
  })
  description: string;

  @ManyToOne(() => User)
  creator: User;

  @ManyToOne(() => Repository, {
    onDelete: 'CASCADE',
  })
  repository: Repository;

  @OneToMany(() => Interface, inte => inte.module)
  interfaces: Interface[];

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;
}
