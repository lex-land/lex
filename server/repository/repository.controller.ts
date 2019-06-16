import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Session,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateRepositoryDto } from './dto/create-repo.dto';
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
  public async create(
    @Body() body: CreateRepositoryDto,
    @Session() session: any,
  ) {
    return this.repoService.create(
      Object.assign(body, { creator: session.user, owner: session.user }),
    );
  }

  @Put(':id')
  public async update(@Body() body: any, @Param('id') id: string) {
    return this.repoService.update(+id, body);
  }

  @Delete(':id')
  public async delete(@Param('id') id: string) {
    return this.repoService.delete(+id);
  }

  @Get(':id')
  public async show(@Param('id') id: string) {
    return this.repoService.findById(id);
  }
}
