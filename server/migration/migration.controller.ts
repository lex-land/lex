import { Body, Controller, Post, Session } from '@nestjs/common';
import { InterfaceService } from '@server/interface/interface.service';
import { MigrateRepoDto } from './dto/migrate-repo.dto';
import { ModuleService } from '@server/module/module.service';
import { PropertyService } from '@server/property/property.service';
import { RepositoryService } from '@server/repository/repository.service';

@Controller('migration')
export class MigrationController {
  constructor(
    private readonly repoService: RepositoryService,
    private readonly modService: ModuleService,
    private readonly inteService: InterfaceService,
    private readonly propService: PropertyService,
  ) {}
  @Post('repo')
  public async migrationRepo(
    @Body('data') repoJson: MigrateRepoDto,
    @Session() session: any,
  ) {
    const repo = await this.repoService.create({
      name: repoJson.name,
      description: repoJson.description,
      creator: session.user,
      owner: session.user,
      members: [session.user],
    });
    for (const repoMod of repoJson.modules) {
      const mod = await this.modService.create({
        name: repoMod.name,
        description: repoMod.description,
        repository: repo,
      });
      for (const modInte of repoMod.interfaces) {
        const inte = await this.inteService.create({
          method: modInte.method,
          url: modInte.url,
          name: modInte.name,
          description: modInte.description,
          repository: repo,
          module: mod,
        });
        await this.propService.createSome(modInte.properties, {
          repository: repo,
          module: mod,
          interface: inte,
        });
      }
    }
    return repo;
  }
  // @Get('sync')
  // public async sync() {
  //   const json = await import('./data/org.json');
  //   return Promise.all(
  //     json.data.map(async org =>
  //       this.orgService.create({
  //         name: org.name,
  //         description: org.description,
  //         creator: await this.userService.getUserByName(org.creator.fullname),
  //         owner: await this.userService.getUserByName(org.owner.fullname),
  //         members: await Promise.all(
  //           org.members.map(m => this.userService.getUserByName(m.fullname)),
  //         ),
  //       } as any),
  //     ),
  //   );
  // }
  // @Get('sync')
  // @UseGuards(AuthGuard('jwt'))
  // public async sync() {
  //   const json = await import('./data/user.json');
  //   return Promise.all(
  //     json.data.map(user =>
  //       this.service.create({
  //         fullname: user.fullname,
  //         email: `${user.fullname}@sunmi.com`,
  //         password: 'sunmi388',
  //       }),
  //     ),
  //   );
  // }
  // @Get('sync')
  // public async findRap2() {
  // const json = await import('./data/manage.json');
  // const repo = json.data;
  // return this.repoService.create({
  //   name: repo.name,
  //   description: repo.description,
  //   creator: await this.userService.getUserByName(repo.creator.fullname),
  //   owner: await this.userService.getUserByName(repo.owner.fullname),
  //   members: await Promise.all(
  //     repo.members.map(m => this.userService.getUserByName(m.fullname)),
  //   ),
  //   modules: await Promise.all(
  //     repo.modules.map(async mod =>
  //       this.modService.create({
  //         name: mod.name,
  //         description: mod.description,
  //         // interfaces: await Promise.all(
  //         //   mod.interfaces.map(async inte =>
  //         //     this.inteService.create({
  //         //       name: inte.name,
  //         //       description: inte.description,
  //         //       url: inte.url,
  //         //       method: inte.method,
  //         //       properties: await this.propService.createSome(
  //         //         inte.properties,
  //         //       ),
  //         //     }),
  //         //   ),
  //         // ),
  //       } as any),
  //     ),
  //   ),
  // } as any);
  // }
}
