import { CreateOrgDto } from './dto/create-org.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Organization } from './organization.entity';
import { Repository } from 'typeorm';

// import { CheckUserDto } from './dto/check-user.dto';
// import { CreateUserDto } from './dto/create-user.dto';
// import { User } from './user.entity';

@Injectable()
export class OrganizationService {
  constructor(
    @InjectRepository(Organization)
    private readonly orgRepository: Repository<Organization>,
  ) {}

  async findAll(): Promise<Organization[]> {
    return await this.orgRepository.find();
  }

  // async isExistByEmail(email: string): Promise<boolean> {
  //   const exists = await this.userRepository.findOne({
  //     where: { email },
  //   });
  //   return !!exists;
  // }

  async create(createOrgDto: CreateOrgDto): Promise<Organization> {
    return await this.orgRepository.save(createOrgDto);
  }

  // async getUserByLogin({
  //   email,
  //   password,
  // }: CheckUserDto): Promise<User | undefined> {
  //   return await this.userRepository.findOne({
  //     where: { email, password: md5(md5(password)) },
  //   });
  // }
}
