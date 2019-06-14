import { ENV } from '@config/env';
import { FetchError } from '@config/error';
import { Injectable } from '@nestjs/common';
import { Jwt } from './interfaces/jwt.interface';
import { JwtService } from '@nestjs/jwt';
import { User } from '@server/user/user.entity';
import { UserService } from '@server/user/user.service';

@Injectable()
export class SessionService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}
  genToken(user: User) {
    return {
      [ENV.KEYOF_TOKEN]: this.jwtService.sign({ email: user.email }),
    };
  }
  decodeToken(token: string): Jwt {
    return this.jwtService.decode(token) as any;
  }
  findUserByEmail(email: string, relations: string[] = []) {
    if (email) {
      return this.userService.findOneByEmail(email, relations);
    } else {
      return new FetchError(403, '身份失效');
    }
  }
  findUserByToken(token: string, relations: string[] = []) {
    const { email } = this.decodeToken(token);
    return this.findUserByEmail(email, relations);
  }
}
