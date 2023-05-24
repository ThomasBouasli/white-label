import { compare } from 'bcrypt';

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { User } from '@/app/infra/database/entities/user.entity';

import { UserService } from '../../user/user.service';
import { AuthTokenPayloadDTO } from '../dto/auth-token-payload.dto';
import { AuthTokenDTO } from '../dto/auth-token.dto';
import { LoginDataDTO } from '../dto/login-data.dto';
import { LoginDTO } from '../dto/login.dto';
import { PermissionString } from '../types/permission-string.type';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login({ email, password }: LoginDTO): Promise<LoginDataDTO> {
    const user = await this.validateUser({ email, password });

    const authToken = await this.generateToken(user);

    return {
      auth_token: authToken,
      user,
    };
  }

  async validateUser({ email, password }: LoginDTO): Promise<User> {
    const user = await this.userService.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    console.log('user', user.password);
    console.log('data', password);

    const isPasswordValid = await compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return user;
  }

  async generateToken(user: User): Promise<AuthTokenDTO> {
    const payload: AuthTokenPayloadDTO = {
      sub: user.id,
      email: user.email,
    };

    const accessToken = this.jwtService.sign(payload);

    return {
      access_token: accessToken,
    };
  }

  async findById(id: string): Promise<User> {
    return this.userService.findById(id);
  }

  async hasPermission(
    user_id: string,
    permissionOrPermissions: PermissionString | PermissionString[],
  ): Promise<boolean> {
    const userPermissions = await this.userService.getUserPermissions(user_id);

    const permissions = Array.isArray(permissionOrPermissions)
      ? permissionOrPermissions
      : [permissionOrPermissions];

    return permissions.every((permission) => {
      return userPermissions.some((userPermission) =>
        userPermission.isEquals(permission),
      );
    });
  }
}
