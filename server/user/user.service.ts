import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { LoginDto } from '../session/dto/login.dto';
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
    return await this.userRepository.find();
  }

  async findOne(id: string): Promise<User | undefined> {
    return await this.userRepository.findOneOrFail(id, {
      relations: [
        'ownedOrganizations',
        'joinedOrganizations',
        'ownedRepositories',
        'joinedRepositories',
      ],
    });
  }

  async findOneByLoginDto(loginDto: LoginDto) {
    return this.userRepository.findOneOrFail({
      where: [
        {
          email: loginDto.username,
          password: md5(loginDto.password),
        },
        {
          fullname: loginDto.username,
          password: md5(loginDto.password),
        },
      ],
    });
  }

  async create(createUserDto: CreateUserDto) {
    const newUser = new User();
    return await this.userRepository.save(
      Object.assign(newUser, createUserDto, {
        password: md5(createUserDto.password),
      }),
    );
  }

  async findOneByEmail(email: string, relations: string[] = []) {
    return await this.userRepository.findOne({
      where: { email },
      relations,
    });
  }

  async isExist(username: string): Promise<boolean> {
    try {
      const exists = await this.userRepository.findOne({
        where: [{ fullname: username }, { email: username }],
      });
      return !!exists;
    } catch (error) {
      return false;
    }
  }

  // async getUserByNameLogin({ fullname, password }: any) {
  //   return await this.userRepository.findOne({
  //     where: { fullname, password: md5(password) },
  //   });
  // }

  // async getUserByLogin({ username, password }: LoginDto) {
  //   return await this.userRepository.findOne({
  //     where: { fullname: username, password: md5(password) },
  //   });
  // }
}
