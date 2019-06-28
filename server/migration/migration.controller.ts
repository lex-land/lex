import { Body, Controller, Post, Session } from '@nestjs/common';
import { InterfaceService } from '@server/interface/interface.service';
import { MigrateRepoDto } from './dto/migrate-repo.dto';
import { ModuleService } from '@server/module/module.service';
import { OrganizationService } from '@server/organization/organization.service';
import { PropertyService } from '@server/property/property.service';
import { RepositoryService } from '@server/repository/repository.service';
import { UserService } from '@server/user/user.service';
import md5 from 'md5';

@Controller('migration')
export class MigrationController {
  constructor(
    private readonly userService: UserService,
    private readonly orgService: OrganizationService,
    private readonly repoService: RepositoryService,
    private readonly modService: ModuleService,
    private readonly inteService: InterfaceService,
    private readonly propService: PropertyService,
  ) {}
  @Post('repo')
  public async migrateRepo(
    @Body('data') repoJson: MigrateRepoDto,
    @Session() session: any,
  ) {
    const repo = await this.repoService.create({
      name: repoJson.name,
      description: repoJson.description,
      creator: session.user,
      owner: session.user,
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

  @Post('org')
  public async migrateOrgs(@Body('data') orgJson: any) {
    const userObject: any = {};
    for (const { members } of orgJson) {
      for (const user of members) {
        userObject[user.email] = await this.userService.findOneByEmail(
          user.email,
        );
      }
    }

    return Promise.all(
      orgJson.map(async (org: any) =>
        this.orgService.create({
          name: org.name,
          description: org.description,
          creator: userObject[org.creator.email],
          owner: userObject[org.owner.email],
          members: org.members.map((m: any) => userObject[m.email]),
        }),
      ),
    );
  }

  @Post('user')
  public async migrateUser(@Body('data') orgJson: any) {
    const userObject: any = {};
    for (const { members } of orgJson) {
      for (const user of members) {
        if (userObject[user.email]) {
          userObject[user.email] = user;
        } else {
          userObject[user.email] = await this.userService.create({
            fullname: user.fullname,
            email: user.email,
            password: md5('sunmi388'),
          });
        }
      }
    }
    return userObject;
  }
}
