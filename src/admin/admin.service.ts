import { hash } from 'bcrypt';

import { Injectable } from '@nestjs/common';

import { Roles } from '@/auth/decorator/roles.decorator';

import { Role } from '@/auth/enum/role.enum';

import { AuthService } from '@/auth/auth.service';

import { PrismaService } from '@/app/infra/database';

@Injectable()
export class AdminService {
  constructor(
    private authService: AuthService,
    private prisma: PrismaService,
  ) {}

  async registerUser({ email, password }: { email: string; password: string }) {
    const hashedPassword = await hash(password, 10);

    const user = await this.prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        userRoles: {
          create: [
            {
              role: {
                connect: {
                  name: Role.ADMIN,
                },
              },
            },
          ],
        },
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

    return this.authService.login(user);
  }

  @Roles(Role.ADMIN)
  async getAllUsers() {
    return this.prisma.user.findMany({
      where: {
        userRoles: {
          some: {
            role: {
              name: Role.ADMIN,
            },
          },
        },
      },
    });
  }
}
