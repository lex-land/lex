import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Module } from './module.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ModuleService {
  constructor(
    @InjectRepository(Module)
    private readonly moduRepository: Repository<Module>,
  ) {}

  public findByRepository = async (id: string) => {
    return this.moduRepository.find({
      where: { repository: { id } },
      relations: ['interfaces'],
    });
  };

  public async findOne(id: string) {
    return await this.moduRepository.findOne(id, {
      relations: ['interfaces', 'repository'],
    });
  }

  public async create(createModuDto: any) {
    return await this.moduRepository.save(createModuDto);
  }

  public async update(id: number, updateModuDto: any) {
    return await this.moduRepository.update(id, updateModuDto);
  }
  public async delete(id: number) {
    return await this.moduRepository.delete(id);
  }
}
