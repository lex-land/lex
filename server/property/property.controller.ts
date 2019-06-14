import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PropertyService } from './property.service';

@Controller('property')
@UseGuards(AuthGuard('jwt'))
export class PropertyController {
  constructor(private readonly propService: PropertyService) {}
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
