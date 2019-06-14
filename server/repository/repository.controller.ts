import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateRepoPayload } from './interfaces/payload.interface';
import { RepositoryService } from './repository.service';

@Controller('repository')
@UseGuards(AuthGuard('jwt'))
export class RepositoryController {
  constructor(private readonly repoService: RepositoryService) {}
  @Get()
  public async findAll() {
    return this.repoService.findAll();
  }

  @Post()
  public async create(@Body() body: CreateRepoPayload) {
    return this.repoService.create(body);
  }

  @Put(':id')
  public async update(@Body() body: any, @Param('id') id: string) {
    return this.repoService.update(+id, body);
  }

  @Get(':id')
  public async show(@Param('id') id: string) {
    return this.repoService.findById(id);
  }
}
