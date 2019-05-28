import { Injectable } from '@nestjs/common';
import { Jwt } from './interfaces/jwt.interface';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';
import { LoginPayload } from '../user/interfaces/login.interface';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async signIn(loginPayload: LoginPayload) {
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
      return {};
    }
  }

  async validateUser(payload: JwtPayload): Promise<boolean> {
    // this.jwtService.verify()
    // put some validation logic here
    // for example query user by id/email/username
    return await this.userService.isExistByEmail(payload.email);
  }

  async getUserByToken(token: string): Promise<any> {
    // this.jwtService.verify()
    // put some validation logic here
    // for example query user by id/email/username
    const result = await this.jwtService.decode(token);

    const jwt: Partial<Jwt> = result as any;
    if (jwt.email) {
      return await this.userService.getUserByEmail(jwt.email);
    }
  }
}
