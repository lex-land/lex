import { Module } from '@nestjs/common';
import { Repository } from './repository.entity';
import { RepositoryController } from './repository.controller';
import { RepositoryService } from './repository.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Repository])],
  controllers: [RepositoryController],
  providers: [RepositoryService],
  exports: [RepositoryService],
})
export class RepositoryModule {}
