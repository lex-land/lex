import { Module } from '@nestjs/common';
import { ModuleController } from './module.controller';
import { Module as ModuleEntity } from './module.entity';
import { ModuleService } from './module.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ModuleEntity])],
  controllers: [ModuleController],
  providers: [ModuleService],
  exports: [ModuleService],
})
export class ModuleModule {}
