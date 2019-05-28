import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import { CreateModuPayload } from './interfaces/payload.interface';
import { FileInterceptor } from '@nestjs/platform-express';
import { ModuleService } from './module.service';

@Controller('module')
export class ModuleController {
  constructor(private readonly moduService: ModuleService) {}

  @Post()
  @UseInterceptors(FileInterceptor(''))
  public async create(@Body() body: CreateModuPayload) {
    return this.moduService.create({
      ...body,
      repository: { id: body.repository },
    });
  }
}
