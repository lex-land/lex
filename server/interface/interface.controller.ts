import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateIntefaceDto } from './dto/create-inte.dto';
import { InterfaceService } from './interface.service';

@Controller('interface')
@UseGuards(AuthGuard('jwt'))
export class InterfaceController {
  constructor(private readonly inteService: InterfaceService) {}
  @Post()
  public async create(@Body() body: CreateIntefaceDto) {
    return this.inteService.create(body);
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
