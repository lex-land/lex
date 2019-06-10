import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { OrganizationService } from './organization.service';
import { PostOrgPayload } from './interfaces/org.interface';
import { UserService } from '../user/user.service';

@Controller('organization')
export class OrganizationController {
  constructor(
    private readonly orgService: OrganizationService,
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Get('sync')
  public async sync() {
    const json = await import('./data/org.json');
    return Promise.all(
      json.data.map(async org =>
        this.orgService.create({
          name: org.name,
          description: org.description,
          creator: await this.userService.getUserByName(org.creator.fullname),
          owner: await this.userService.getUserByName(org.owner.fullname),
          members: await Promise.all(
            org.members.map(m => this.userService.getUserByName(m.fullname)),
          ),
        } as any),
      ),
    );
  }

  @Get()
  public async findAll() {
    return await this.orgService.findAll();
  }

  @Post()
  public async create(@Body() body: PostOrgPayload) {
    const json = await this.orgService.create({
      ...body,
    });
    return json;
  }
}
