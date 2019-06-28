import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Session,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateOrgDto } from './dto/create-org.dto';
import { OrganizationService } from './organization.service';
import { ValidatorError } from '@helpers/validation/error';

@Controller('organization')
@UseGuards(AuthGuard('jwt'))
export class OrganizationController {
  constructor(private readonly orgService: OrganizationService) {}
  @Get()
  public async findAll() {
    return await this.orgService.findAll();
  }

  @Post()
  public async create(@Body() body: CreateOrgDto, @Session() session: any) {
    if (!(await this.orgService.findOneByName(body.name))) {
      return this.orgService.create(
        Object.assign(body, { creator: session.user, owner: session.user }),
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
