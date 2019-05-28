import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { CreateRepoPayload } from './interfaces/payload.interface';
import { RepositoryService } from './repository.service';
import { User } from '../user/user.entity';

@Controller('repository')
export class RepositoryController {
  constructor(
    private readonly repoService: RepositoryService,
    private readonly authService: AuthService,
  ) {}

  @Get()
  public async findAll() {
    return this.repoService.findAll();
  }

  @Post()
  public async create(@Body() body: CreateRepoPayload, @Req() req: any) {
    // TODO: 微服务出现不响应的问题
    const sessionUser: User = await this.authService.getUserByToken(
      req.cookies.accessToken,
    );
    const json = await this.repoService.create({
      ...body,
      creator: sessionUser,
      owner: sessionUser,
      members: body.members.filter(Boolean).map(id => ({ id })),
    });
    return json;
  }

  @Get(':id')
  public async show(@Param('id') id: string) {
    return this.repoService.findById(id);
  }
}
