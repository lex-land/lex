import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Render,
  Req,
} from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { CreateRepoPayload } from './interfaces/payload.interface';
import { InterfaceService } from '../interface/interface.service';
import { PropertyService } from '../property/property.service';
import { RepositoryService } from './repository.service';
import { User } from '../user/user.entity';

@Controller('repository')
export class RepositoryController {
  constructor(
    private readonly repoService: RepositoryService,
    private readonly authService: AuthService,
    private readonly inteService: InterfaceService,
    private readonly propService: PropertyService,
  ) {}

  @Get()
  @Render('views/Repository')
  public async root() {
    return {
      repositorys: await this.repoService.findAll(),
    };
  }

  @Get('new')
  @Render('views/New')
  public async createQuery() {
    return {};
  }

  @Post('new')
  @Render('views/New')
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
  @Render('views/Show')
  public async show(@Param() params: { id: string }, @Query() query: any) {
    const repository = await this.repoService.findById(params.id);
    const interfaces = await this.inteService.findByModuleId(query.module);
    const properties = await this.propService.findByInterfaceId(
      query.interface,
    );
    return { ...repository, interfaces, properties };
  }
}
