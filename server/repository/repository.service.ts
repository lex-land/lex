import { FindManyOptions, Repository } from 'typeorm';
import { CreateRepositoryDto } from './dto/create-repo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository as RepositoryEntity } from './repository.entity';

@Injectable()
export class RepositoryService {
  constructor(
    @InjectRepository(RepositoryEntity)
    private readonly repoRepository: Repository<RepositoryEntity>,
  ) {}

  public async findById(id: string) {
    return await this.repoRepository.findOneOrFail(id, {
      relations: ['owner', 'members', 'modules', 'modules.interfaces'],
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
    const repo = await this.repoRepository.findOneOrFail(id, {
      relations: ['interfaces'],
    });
    return repo.interfaces;
  }

  public async findModulesById(id: string) {
    const repo = await this.repoRepository.findOneOrFail(id, {
      relations: ['modules'],
    });
    return repo.modules;
  }

  public async findOne(options?: FindManyOptions<RepositoryEntity>) {
    return await this.repoRepository.findOne(options);
  }

  public async findAll(options?: FindManyOptions<RepositoryEntity>) {
    return await this.repoRepository.find({
      relations: ['owner', 'organization'],
      ...options,
    });
  }

  public async create(createRepositoryDto: any) {
    return await this.repoRepository.save(createRepositoryDto);
  }

  public async update(
    id: number,
    createRepositoryDto: Partial<CreateRepositoryDto>,
  ) {
    return await this.repoRepository.update(id, createRepositoryDto);
  }

  public async addMember(id: number, member: any) {
    return await this.repoRepository
      .createQueryBuilder()
      .relation(RepositoryEntity, 'members')
      .of({ id })
      .add(member);
  }

  public async removeMember(id: number, member: any) {
    return await this.repoRepository
      .createQueryBuilder()
      .relation(RepositoryEntity, 'members')
      .of({ id })
      .remove(member);
  }

  public async delete(id: number) {
    return await this.repoRepository.delete(id);
  }
}
