import type { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

import { AuthService } from '../auth.service';
import { PayloadDTO } from '../dto/payload.dto';
import { UserWithRolesDTO } from '../dto/user-with-roles.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        JwtStrategy.extractJWT,
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ]),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  private static extractJWT(req: Request): string | null {
    if (req.cookies && 'jwt' in req.cookies) {
      return req.cookies.jwt;
    }
    return null;
  }

  validate(payload: PayloadDTO): Promise<UserWithRolesDTO> {
    return this.authService.validateJWT(payload);
  }
}
