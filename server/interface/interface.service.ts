import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Interface } from './interface.entity';
import { Repository } from 'typeorm';

@Injectable()
export class InterfaceService {
  constructor(
    @InjectRepository(Interface)
    private readonly inteRepository: Repository<Interface>,
  ) {}
  public async findByModuleId(module: string) {
    return await this.inteRepository.find({
      where: { module: { id: module } },
      relations: ['module'],
    });
  }
  public async findById(id: string) {
    return this.inteRepository.findOne(id, {
      relations: [
        'module',
        'properties',
        'properties.parent',
        'properties.children',
      ],
    });
  }
  public async create(createInteDto: any) {
    return await this.inteRepository.save(createInteDto);
  }
  public async update(id: string, createInteDto: any) {
    return await this.inteRepository.update(id, createInteDto);
  }
  public async delete(id: string) {
    return await this.inteRepository.delete(id);
  }
}
