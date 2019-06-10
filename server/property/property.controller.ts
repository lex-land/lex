import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
// import { Property } from './property.entity';
import { PropertyService } from './property.service';

@Controller('property')
export class PropertyController {
  constructor(private readonly propService: PropertyService) {}

  @Get('sync')
  public async createSome() {
    const json = await import('./data/some.json');
    return this.propService.createSome(json.default);
  }

  @Post()
  public async create(@Body() body: any) {
    return this.propService.create({
      ...body,
    });
  }

  @Put(':id')
  public async update(@Param('id') id: string, @Body() body: any) {
    return this.propService.update(id, body);
  }

  @Delete(':id')
  public async delete(@Param('id') id: string) {
    return this.propService.delete(+id);
  }

  @Delete()
  public async deleteMany(@Body('ids') ids: number[]) {
    return this.propService.deleteMany(ids);
  }
}
