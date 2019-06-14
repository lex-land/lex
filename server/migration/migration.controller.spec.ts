import { Test, TestingModule } from '@nestjs/testing';
import { MigrationController } from './migration.controller';

describe('Migration Controller', () => {
  let controller: MigrationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MigrationController],
    }).compile();

    controller = module.get<MigrationController>(MigrationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
