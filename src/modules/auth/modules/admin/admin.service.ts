import { hash } from 'bcrypt';

import { Injectable } from '@nestjs/common';

import { Roles } from '@/modules/auth/decorator/roles.decorator';

import { Role } from '@/modules/auth/enum/role.enum';

import { AuthService } from '@/modules/auth/auth.service';

import { PrismaService } from '@/app/infra/database';

import { RegisterUserDTO } from '../../dto/register-user.dto';

@Injectable()
export class AdminService {
  constructor(
    private authService: AuthService,
    private prisma: PrismaService,
  ) {}

  async registerUser({ email, password, name }: RegisterUserDTO) {
    const hashedPassword = await hash(password, 10);

    const user = await this.prisma.user.create({
      data: {
        name,
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
