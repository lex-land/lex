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
      select: ['id', 'fullname'],
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
  async getUserByNameLogin({
    fullname,
    password,
  }: any): Promise<User | undefined> {
    return await this.userRepository.findOne({
      where: { fullname, password: md5(password) },
    });
  }
  async getUserByLogin({
    username,
    password,
  }: CheckUserDto): Promise<User | undefined> {
    return await this.userRepository.findOne({
      where: { fullname: username, password: md5(password) },
    });
  }

  async getUserByEmail(
    jwt: any,
    relations: string[],
  ): Promise<User | undefined> {
    return await this.userRepository.findOne({
      where: { email: jwt.email },
      relations,
    });
  }

  async getUserByName(fullname: string) {
    return await this.userRepository.findOne({
      where: { fullname },
    });
  }
}
