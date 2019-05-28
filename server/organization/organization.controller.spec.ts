import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseModule } from '@src/database/database.module';
import { OrganizationController } from './organization.controller';

describe('Organization Controller', () => {
  let controller: OrganizationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DatabaseModule, OrganizationController],
    }).compile();

    controller = module.get<OrganizationController>(OrganizationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
