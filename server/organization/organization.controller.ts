import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { OrganizationService } from './organization.service';
import { PostOrgPayload } from './interfaces/org.interface';

@Controller('organization')
@UseGuards(AuthGuard('jwt'))
export class OrganizationController {
  constructor(private readonly orgService: OrganizationService) {}
  @Get()
  public async findAll() {
    return await this.orgService.findAll();
  }

  @Post()
  public async create(@Body() body: PostOrgPayload) {
    return this.orgService.create(body);
  }
}
