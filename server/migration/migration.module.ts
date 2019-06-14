import { InterfaceModule } from '../interface/interface.module';
import { MigrationController } from './migration.controller';
import { Module } from '@nestjs/common';
import { ModuleModule } from '@server/module/module.module';
import { PropertyModule } from '../property/property.module';

@Module({
  imports: [ModuleModule, InterfaceModule, PropertyModule],
  controllers: [MigrationController],
})
export class MigrationModule {}
