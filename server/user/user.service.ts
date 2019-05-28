import { CheckUserDto } from './dto/check-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import md5 from 'md5';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.userRepository.find({
      relations: [
        'ownedOrganizations',
        'joinedOrganizations',
        'ownedRepositories',
        'joinedRepositories',
      ],
    });
  }

  async findOne(id: string): Promise<User | undefined> {
    return await this.userRepository.findOne(id, {
      relations: [
        'ownedOrganizations',
        'joinedOrganizations',
        'ownedRepositories',
        'joinedRepositories',
      ],
    });
  }

  async isExistByEmail(email: string): Promise<boolean> {
    const exists = await this.userRepository.findOne({
      where: { email },
    });
    return !!exists;
  }

  async create(createUserDto: CreateUserDto): Promise<User | undefined> {
    const newUser = new User();
    return await this.userRepository.save(
      Object.assign(newUser, createUserDto, {
        password: md5(md5(createUserDto.password)),
      }),
    );
  }

  async getUserByLogin({
    email,
    password,
  }: CheckUserDto): Promise<User | undefined> {
    return await this.userRepository.findOne({
      where: { email, password: md5(md5(password)) },
    });
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return await this.userRepository.findOne({
      where: { email },
    });
  }
}
