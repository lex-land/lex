import { AuthService } from './auth.service';
import { Controller } from '@nestjs/common';
// import { LoginPayload } from '../user/interfaces/login.interface';
// import { MessagePattern } from '@nestjs/microservices';
import { UserService } from '../user/user.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  // @Get('token')
  // async createToken(@Request() req: any): Promise<any> {
  //   return await this.authService.createToken(req);
  // }

  // @MessagePattern({ cmd: 'auth/signIn' })
  // async signIn(loginPayload: LoginPayload) {
  //   return this.authService.signIn(loginPayload);
  // }

  // @MessagePattern({ cmd: 'auth/getUserByToken' })
  // async getUserByToken(token: string) {
  //   const user = await this.authService.getUserByToken(token);
  //   if (user) {
  //     return user;
  //   } else {
  //     return false;
  //   }
  // }
}
