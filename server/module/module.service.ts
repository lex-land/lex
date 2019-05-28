import { CreateModuDto } from './dto/create-modu.dto';
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

  // public async findByRepositoryId(id: string) {
  //   return await this.moduRepository.find({
  //     where: { repository: { id } },
  //   });
  // }

  public async create(createModuDto: CreateModuDto) {
    return await this.moduRepository.save(createModuDto);
  }

  public async update(updateModuDto: any) {
    return await this.moduRepository.save(updateModuDto);
  }
}
