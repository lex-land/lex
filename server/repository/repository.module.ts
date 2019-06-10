import { AuthModule } from '../auth/auth.module';
import { InterfaceModule } from '../interface/interface.module';
import { Module } from '@nestjs/common';
import { ModuleModule } from '@server/module/module.module';
import { PropertyModule } from '../property/property.module';
import { Repository } from './repository.entity';
import { RepositoryController } from './repository.controller';
import { RepositoryService } from './repository.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([Repository]),
    AuthModule,
    ModuleModule,
    InterfaceModule,
    PropertyModule,
  ],
  controllers: [RepositoryController],
  providers: [RepositoryService],
})
export class RepositoryModule {}
