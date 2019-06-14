import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { LoginDto } from './dto/login.dto';
import { SessionService } from './session.service';
import { Token } from '@server/common/decorators/token.decorator';
import { UserService } from '@server/user/user.service';

@Controller('session')
export class SessionController {
  constructor(
    private readonly sessionService: SessionService,
    private readonly userService: UserService,
  ) {}
  @Post()
  public async login(@Body() loginDto: LoginDto) {
    const user = await this.userService.findOneByLoginDto(loginDto);
    if (user) {
      return this.sessionService.genToken(user);
    } else {
      return { accessToken: '' };
    }
  }

  @Get('user')
  @UseGuards(AuthGuard('jwt'))
  public async sessionUser(@Token() token: string) {
    return this.sessionService.findUserByToken(token, [
      'ownedOrganizations',
      'joinedOrganizations',
      'ownedRepositories',
      'joinedRepositories',
    ]);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  public async session(@Token() token: string) {
    return this.sessionService.findUserByToken(token);
  }
}
