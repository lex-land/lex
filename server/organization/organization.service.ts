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
    return await this.orgRepository.find({ relations: ['members'] });
  }

  async create(createOrgDto: any): Promise<Organization> {
    return await this.orgRepository.save(createOrgDto);
  }
  async delete(id: string) {
    return await this.orgRepository.delete(id);
  }

  async findOneByName(name: string) {
    return await this.orgRepository.findOne({
      where: { name },
      relations: ['repositories'],
    });
  }
}
