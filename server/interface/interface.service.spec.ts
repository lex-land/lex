import { Test, TestingModule } from '@nestjs/testing';
import { InterfaceService } from './interface.service';

describe('InterfaceService', () => {
  let service: InterfaceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InterfaceService],
    }).compile();

    service = module.get<InterfaceService>(InterfaceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
