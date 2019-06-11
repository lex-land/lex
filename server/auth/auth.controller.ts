import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { FetchError } from '@config/error';
import { JwtService } from '@nestjs/jwt';
import { Token } from '@server/common/decorators/token.decorator';
import { UserService } from '@server/user/user.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  @Post()
  async signIn(@Body() loginPayload: any) {
    return this.authService.signIn(loginPayload);
  }

  @Get('session')
  public async session(@Token() token: string) {
    // this.jwtService.verify()
    // put some validation logic here
    // for example query user by id/email/username
    if (token) {
      const jwt = await this.jwtService.decode(token);
      return await this.userService.getUserByEmail(jwt, []);
    } else {
      return new FetchError(403, '身份失效');
    }
  }

  @Get('session-user')
  public async sessionUser(@Token() token: string) {
    // this.jwtService.verify()
    // put some validation logic here
    // for example query user by id/email/username
    if (token) {
      const jwt = await this.jwtService.decode(token);
      return await this.userService.getUserByEmail(jwt, [
        'ownedOrganizations',
        'joinedOrganizations',
        'ownedRepositories',
        'joinedRepositories',
      ]);
    } else {
      return new FetchError(403, '身份失效');
    }
  }
}
