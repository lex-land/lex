import { Module } from '@nestjs/common';
import { Organization } from './organization.entity';
import { OrganizationController } from './organization.controller';
import { OrganizationService } from './organization.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Organization])],
  controllers: [OrganizationController],
  providers: [OrganizationService],
  exports: [OrganizationService],
})
export class OrganizationModule {}
