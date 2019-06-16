import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateModuDto } from './dto/create-modu.dto';
import { ModuleService } from './module.service';

@Controller('module')
@UseGuards(AuthGuard('jwt'))
export class ModuleController {
  constructor(private readonly moduService: ModuleService) {}

  @Post()
  public async create(@Body() body: CreateModuDto) {
    return this.moduService.create(body);
  }

  @Get()
  public async findAll(@Query('repository') repository: string) {
    return this.moduService.findByRepository(repository);
  }

  @Get(':id')
  public async findOne(@Param('id') id: string) {
    return this.moduService.findOne(id);
  }

  @Put(':id')
  public async update(
    @Param('id') id: string,
    @Body() { interfaces, ...body }: any,
  ) {
    return this.moduService.update(+id, body);
  }

  @Delete(':id')
  public async delete(@Param('id') id: string) {
    return this.moduService.delete(+id);
  }
}
