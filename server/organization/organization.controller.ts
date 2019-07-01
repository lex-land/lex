import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CacheService } from '@server/cache/cache.service';
import { CreateOrgDto } from './dto/create-org.dto';
import { OrganizationService } from './organization.service';
import { ValidatorError } from '@helpers/validation/error';

@Controller('organization')
@UseGuards(AuthGuard('jwt'))
export class OrganizationController {
  constructor(
    private readonly orgService: OrganizationService,
    private readonly cacheService: CacheService,
  ) {}
  @Get()
  public async findAll() {
    return await this.orgService.findAll();
  }

  @Post()
  public async create(@Body() body: CreateOrgDto) {
    const sessionUser = await this.cacheService.get('SESSION_USER');
    if (!(await this.orgService.findOneByName(body.name))) {
      return this.orgService.create(
        Object.assign(body, { creator: sessionUser, owner: sessionUser }),
      );
    } else {
      return ValidatorError({ name: 'name is exsit' });
    }
  }

  @Get(':name')
  public async findOneByName(@Param('name') name: string) {
    return await this.orgService.findOneByName(name);
  }

  @Delete(':id')
  public async delete(@Param('id') id: string) {
    return await this.orgService.delete(id);
  }
}
