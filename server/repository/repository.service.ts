import { CreateRepositoryDto } from './dto/create-repo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Repository as RepositoryEntity } from './repository.entity';

@Injectable()
export class RepositoryService {
  constructor(
    @InjectRepository(RepositoryEntity)
    private readonly repoRepository: Repository<RepositoryEntity>,
  ) {}

  public async findById(id: string) {
    return await this.repoRepository.findOneOrFail({
      where: { id },
      relations: ['members', 'modules', 'modules.interfaces'],
    });
  }

  public async findWhere(payload: any) {
    const repo = await this.repoRepository.findOneOrFail({
      where: payload,
      relations: ['interfaces'],
    });
    return repo;
  }

  public async findInterfacesById(id: string) {
    const repo = await this.repoRepository.findOneOrFail({
      where: { id },
      relations: ['interfaces'],
    });
    return repo.interfaces;
  }

  public async findModulesById(id: string) {
    const repo = await this.repoRepository.findOneOrFail({
      where: { id },
      relations: ['modules'],
    });
    return repo.modules;
  }

  public async findAll() {
    return await this.repoRepository.find({
      relations: ['owner', 'organization'],
    });
  }

  public async create(createRepositoryDto: CreateRepositoryDto) {
    return await this.repoRepository.save(createRepositoryDto);
  }

  public async update(
    id: number,
    createRepositoryDto: Partial<CreateRepositoryDto>,
  ) {
    return await this.repoRepository.update(id, createRepositoryDto);
  }
}
