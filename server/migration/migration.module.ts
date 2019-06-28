import { InterfaceModule } from '../interface/interface.module';
import { MigrationController } from './migration.controller';
import { Module } from '@nestjs/common';
import { ModuleModule } from '@server/module/module.module';
import { OrganizationModule } from '@server/organization/organization.module';
import { PropertyModule } from '@server/property/property.module';
import { RepositoryModule } from '@server/repository/repository.module';

@Module({
  imports: [
    OrganizationModule,
    ModuleModule,
    RepositoryModule,
    InterfaceModule,
    PropertyModule,
  ],
  controllers: [MigrationController],
})
export class MigrationModule {}
