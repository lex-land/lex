import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { LoginDto } from './dto/login.dto';
import { SessionService } from './session.service';
import { Token } from '@server/common/decorators/token.decorator';
import { UserService } from '@server/user/user.service';
import { ValidationError } from 'class-validator';

@Controller('session')
export class SessionController {
  constructor(
    private readonly sessionService: SessionService,
    private readonly userService: UserService,
  ) {}
  @Post()
  public async login(@Body() loginDto: LoginDto) {
    const message: ValidationError[] = [];
    const expection = {
      error: '',
      message,
    };
    if (await this.userService.isExist(loginDto.username)) {
      try {
        const user = await this.userService.findOneByLoginDto(loginDto);
        return this.sessionService.genToken(user);
      } catch (error) {
        // 密码错误
        expection.error = '密码错误';
        expection.message.push({
          property: 'password',
          constraints: { passwordError: 'password is not correct' },
          children: [],
        });
        return expection;
      }
    } else {
      // 用户不存在
      expection.error = '用户不存在';
      expection.message.push({
        property: 'username',
        constraints: { usernameError: 'username is not exist' },
        children: [],
      });
      return expection;
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
  public async session(@Token() token: string) {
    return this.sessionService.findUserByToken(token);
  }
}
