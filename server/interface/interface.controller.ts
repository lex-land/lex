import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { InterfaceService } from './interface.service';
import { PropertyService } from '@server/property/property.service';

@Controller('interface')
export class InterfaceController {
  constructor(
    private readonly inteService: InterfaceService,
    private readonly propService: PropertyService,
  ) {}
  @Post()
  public async create(@Body() body: any) {
    return this.inteService.create({
      ...body,
      repository: { id: body.repository },
      module: { id: body.module },
    });
  }

  @Put(':id')
  public async update(@Body() body: any, @Param('id') id: string) {
    return this.inteService.update(id, {
      ...body,
    });
  }

  @Get(':id')
  public async findOne(@Param('id') id: string) {
    return await this.inteService.findById(id);
  }
  @Delete(':id')
  public async delete(@Param('id') id: string) {
    return await this.inteService.delete(id);
  }
}
