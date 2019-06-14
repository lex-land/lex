import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseModule } from '@server/database/database.module';
import { UserController } from './user.controller';

describe('User Controller', () => {
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DatabaseModule, UserController],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
