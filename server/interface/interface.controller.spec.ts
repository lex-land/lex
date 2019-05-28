import { Test, TestingModule } from '@nestjs/testing';
import { InterfaceController } from './interface.controller';

describe('Interface Controller', () => {
  let controller: InterfaceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InterfaceController],
    }).compile();

    controller = module.get<InterfaceController>(InterfaceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
