import { Injectable } from '@nestjs/common';
import { Jwt } from './interfaces/jwt.interface';
import { PassportStrategy } from '@nestjs/passport';
import { SessionService } from './session.service';
import { Strategy } from 'passport-jwt';
import { getToken } from '@helpers/secure';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly sessionService: SessionService) {
    super({
      jwtFromRequest: (req: any) => getToken({ req }),
      secretOrKey: 'secretKey',
    });
  }

  async validate(payload: Jwt) {
    // iss (issuer)：签发人
    // exp (expiration time)：过期时间
    // sub (subject)：主题
    // aud (audience)：受众
    // nbf (Not Before)：生效时间
    // iat (Issued At)：签发时间
    // jti (JWT ID)：编号
    return this.sessionService.findUserByEmail(payload.email);
  }
}
