import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        JwtStrategy.extractJWT,
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ]),
      ignoreExpiration: false,
      secretOrKey: process.env.ACCESS_TOKEN_SECRET,
    });
  }

  async validate(payload: any) {
    return { id: payload.sub, email: payload.email };
  }

  private static extractJWT(req: Request): string | null {
    if (
      req.cookies &&
      'access_token' in req.cookies &&
      req.cookies.access_token.length > 0
    ) {
      return req.cookies.access_token;
    }
    return null;
  }
}
