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
import { AuthService } from '../auth/auth.service';
import { CreateRepoPayload } from './interfaces/payload.interface';
import { InterfaceService } from '@server/interface/interface.service';
import { ModuleService } from '@server/module/module.service';
import { PropertyService } from '@server/property/property.service';
import { RepositoryService } from './repository.service';
import { UserService } from '@server/user/user.service';

@Controller('repository')
@UseGuards(AuthGuard('jwt'))
export class RepositoryController {
  constructor(
    private readonly repoService: RepositoryService,
    private readonly modService: ModuleService,
    private readonly inteService: InterfaceService,
    private readonly propService: PropertyService,
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}
  @Get('sync')
  public async findRap2() {
    const json = await import('./data/manage.json');
    const repo = json.data;
    return this.repoService.create({
      name: repo.name,
      description: repo.description,
      creator: await this.userService.getUserByName(repo.creator.fullname),
      owner: await this.userService.getUserByName(repo.owner.fullname),
      members: await Promise.all(
        repo.members.map(m => this.userService.getUserByName(m.fullname)),
      ),
      modules: await Promise.all(
        repo.modules.map(async mod =>
          this.modService.create({
            name: mod.name,
            description: mod.description,
            // interfaces: await Promise.all(
            //   mod.interfaces.map(async inte =>
            //     this.inteService.create({
            //       name: inte.name,
            //       description: inte.description,
            //       url: inte.url,
            //       method: inte.method,
            //       properties: await this.propService.createSome(
            //         inte.properties,
            //       ),
            //     }),
            //   ),
            // ),
          } as any),
        ),
      ),
    } as any);
  }

  @Get()
  public async findAll() {
    return this.repoService.findAll();
  }

  @Post()
  public async create(@Body() body: CreateRepoPayload) {
    const json = await this.repoService.create({
      ...body,
    });
    return json;
  }

  @Put(':id')
  public async update(@Body() body: any, @Param('id') id: string) {
    const json = await this.repoService.update(+id, {
      ...body,
    });
    return json;
  }

  @Get(':id')
  public async show(@Param('id') id: string) {
    return this.repoService.findById(id);
  }
}
