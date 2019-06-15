import { CreateOrgDto } from './dto/create-org.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Organization } from './organization.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OrganizationService {
  constructor(
    @InjectRepository(Organization)
    private readonly orgRepository: Repository<Organization>,
  ) {}

  async findAll(): Promise<Organization[]> {
    return await this.orgRepository.find();
  }

  async create(createOrgDto: CreateOrgDto): Promise<Organization> {
    return await this.orgRepository.save(createOrgDto);
  }
  async findOneByName(name: string) {
    return await this.orgRepository.findOne({
      where: { name },
      relations: ['repositories'],
    });
  }
}
