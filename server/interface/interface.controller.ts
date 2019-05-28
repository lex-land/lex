import { Body, Controller, Post, Req, UseInterceptors } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { InterfaceService } from './interface.service';
import { User } from '../user/user.entity';

@Controller('interface')
export class InterfaceController {
  constructor(
    private readonly inteService: InterfaceService,
    private readonly authService: AuthService,
  ) {}
  @Post()
  @UseInterceptors(FileInterceptor(''))
  public async create(@Body() body: any, @Req() req: any) {
    // TODO: 微服务出现不响应的问题
    const sessionUser: User = await this.authService.getUserByToken(
      req.cookies.accessToken,
    );

    // repository: 1
    // module: 1
    // name: 1231231
    // url: 321312
    // method: 3213
    // description: 321
    return this.inteService.create({
      ...body,
      creator: sessionUser,
      repository: { id: body.repository },
      module: { id: body.module },
    });
  }
}
