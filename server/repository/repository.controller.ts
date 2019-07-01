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
import { CacheService } from '@server/cache/cache.service';
import { CreateRepositoryDto } from './dto/create-repo.dto';
import { RepositoryService } from './repository.service';
import { ValidatorError } from '@helpers/validation/error';

@Controller('repository')
@UseGuards(AuthGuard('jwt'))
export class RepositoryController {
  constructor(
    private readonly repoService: RepositoryService,
    private readonly cacheService: CacheService,
  ) {}
  @Get()
  public async findAll() {
    return this.repoService.findAll();
  }

  @Post()
  public async create(@Body() body: CreateRepositoryDto) {
    const sessionUser = await this.cacheService.get('SESSION_USER');
    if (await this.repoService.findOne({ where: { name: body.name } })) {
      return ValidatorError({
        name: 'repo name is exist',
      });
    } else {
      return this.repoService.create(
        Object.assign(body, { creator: sessionUser, owner: sessionUser }),
      );
    }
  }

  @Put(':id')
  public async update(@Body() body: any, @Param('id') id: string) {
    return this.repoService.update(+id, body);
  }

  @Post(':id/members')
  public async addMember(@Body() body: any, @Param('id') id: string) {
    const result = await this.repoService.addMember(+id, body);
    return { result };
  }

  @Delete(':id/members')
  public async updateMembers(@Body() body: any, @Param('id') id: string) {
    const result = this.repoService.removeMember(+id, body);
    return { result };
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
