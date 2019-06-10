import { Injectable } from '@nestjs/common';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async signIn(loginPayload: any) {
    // iss (issuer)：签发人
    // exp (expiration time)：过期时间
    // sub (subject)：主题
    // aud (audience)：受众
    // nbf (Not Before)：生效时间
    // iat (Issued At)：签发时间
    // jti (JWT ID)：编号

    const user = await this.userService.getUserByLogin(loginPayload);
    if (user) {
      const accessToken = this.jwtService.sign({ email: user.email });
      return {
        accessToken,
        expiresIn: 3600,
      };
    } else {
      // 账号或密码错误
      return {
        error: '账号或密码错误',
      };
    }
  }

  async validateUser(payload: JwtPayload): Promise<boolean> {
    // this.jwtService.verify()
    // put some validation logic here
    // for example query user by id/email/username
    return await this.userService.isExistByEmail(payload.email);
  }
}
