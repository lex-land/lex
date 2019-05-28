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
      relations: ['modules'],
    });
  }

  public async findAll() {
    return await this.repoRepository.find();
  }

  public async create(createRepositoryDto: CreateRepositoryDto) {
    return await this.repoRepository.save(createRepositoryDto);
  }
}
