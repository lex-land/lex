import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  Session,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { LoginDto } from './dto/login.dto';
import { SessionService } from './session.service';
import { Token } from '@helpers/decorators/token.decorator';
import { UserService } from '@server/user/user.service';
import { ValidatorError } from '@helpers/validation/error';

@Controller('session')
export class SessionController {
  constructor(
    private readonly sessionService: SessionService,
    private readonly userService: UserService,
  ) {}
  @Post()
  public async login(@Body() loginDto: LoginDto) {
    if (await this.userService.isExist(loginDto.username)) {
      try {
        const user = await this.userService.findOneByLoginDto(loginDto);
        return this.sessionService.genToken(user);
      } catch (error) {
        // 密码错误
        return ValidatorError({
          password: 'password is not correct',
        });
      }
    } else {
      // 用户不存在
      return ValidatorError({
        username: 'username is not exist',
      });
    }
  }

  @UseInterceptors(ClassSerializerInterceptor)
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

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  @UseGuards(AuthGuard('jwt'))
  public async session(@Token() token: string, @Session() session: any) {
    return (session.user = await this.sessionService.findUserByToken(token));
  }
}
