import { Controller } from '@nestjs/common';

// import { InterfaceService } from '@server/interface/interface.service';
// import { ModuleService } from '@server/module/module.service';
// import { PropertyService } from '@server/property/property.service';
// import { UserService } from '@server/user/user.service';

@Controller('migration')
export class MigrationController {
  // @Get('sync')
  // public async createSome() {
  //   const json = await import('./data/some.json');
  //   return this.propService.createSome(json.default);
  // }
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