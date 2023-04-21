import { compare } from 'bcrypt';

import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { PrismaService } from '@/app/infra/database';

import { PayloadDTO } from './dto/payload.dto';
import { UserWithRolesDTO } from './dto/user-with-roles';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService, private prisma: PrismaService) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.prisma.user.findUnique({
      where: {
        email: username,
      },
      include: {
        userRoles: {
          include: {
            role: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });

    if (user) {
      const isMatch = await compare(pass, user.password);
      if (isMatch) {
        delete user.password;
        return user;
      }
    }
    return null;
  }

  async validateJWT(payload: PayloadDTO): Promise<UserWithRolesDTO> {
    if (!payload.id) {
      return null;
    }

    const user = await this.prisma.user.findUnique({
      where: {
        id: payload.id,
      },
      include: {
        userRoles: {
          include: {
            role: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });

    return user;
  }

  async login(user: UserWithRolesDTO) {
    const payload: PayloadDTO = {
      id: user.id,
      roles: user.userRoles.map((userRole) => userRole.role.name),
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async getRoles() {
    return this.prisma.role.findMany();
  }
}
