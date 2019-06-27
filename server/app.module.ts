import { AppController } from './app.controller';
import { CacheModule } from './cache/cache.module';
import { DatabaseModule } from './database/database.module';
import { InterfaceModule } from './interface/interface.module';
import { MigrationModule } from './migration/migration.module';
import { Module } from '@nestjs/common';
import { ModuleModule } from './module/module.module';
import { OrganizationModule } from './organization/organization.module';
import { PropertyModule } from './property/property.module';
import { RepositoryModule } from './repository/repository.module';
import { SessionModule } from './session/session.module';
import { UserModule } from './user/user.module';

@Module({
  controllers: [AppController],
  imports: [
    DatabaseModule,
    InterfaceModule,
    ModuleModule,
    OrganizationModule,
    PropertyModule,
    RepositoryModule,
    UserModule,
    SessionModule,
    MigrationModule,
    CacheModule,
  ],
})
export class AppModule {}
