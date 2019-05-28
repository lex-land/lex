import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from './config/config.module';
import { DatabaseModule } from './database/database.module';
import { InterfaceModule } from './interface/interface.module';
import { Module } from '@nestjs/common';
import { ModuleModule } from './module/module.module';
import { OrganizationModule } from './organization/organization.module';
import { PropertyModule } from './property/property.module';
import { RepositoryModule } from './repository/repository.module';
import { UserModule } from './user/user.module';

@Module({
  controllers: [AppController],
  imports: [
    AuthModule,
    ConfigModule,
    DatabaseModule,
    InterfaceModule,
    ModuleModule,
    OrganizationModule,
    PropertyModule,
    RepositoryModule,
    UserModule,
  ],
})
export class AppModule {}
