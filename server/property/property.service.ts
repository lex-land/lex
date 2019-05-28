import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Property } from './property.entity';
import { TreeRepository } from 'typeorm';

@Injectable()
export class PropertyService {
  constructor(
    @InjectRepository(Property)
    private readonly propRepository: TreeRepository<Property>,
  ) {}
  public async create(createPropDto: any) {
    return await this.propRepository.save(createPropDto);
  }

  public async update(id: number, updatePropDto: any) {
    return await this.propRepository.update({ id }, updatePropDto);
  }

  public async findByInterfaceId(id: string) {
    return await this.propRepository.findTrees();
  }
}
