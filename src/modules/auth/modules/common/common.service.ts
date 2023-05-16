import { hash } from 'bcrypt';

import { Injectable } from '@nestjs/common';

import { Role } from '@/modules/auth/enum/role.enum';

import { AuthService } from '@/modules/auth/auth.service';

import { PrismaService } from '@/app/infra/database';

import { RegisterUserDTO } from '../../dto/register-user.dto';
import { UpdateUserDTO } from '../../dto/update-user.dto';

@Injectable()
export class CommonService {
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
                  name: Role.COMMON,
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

  async updateUser({ id, name, email }: UpdateUserDTO & { id: string }) {
    const user = await this.prisma.user.findUniqueOrThrow({
      where: {
        id,
      },
    });

    if (name) {
      user.name = name;
    }

    if (email) {
      user.email = email;
    }

    await this.prisma.user.update({
      where: {
        id,
      },
      data: user,
    });

    return;
  }

  async getAllUsers() {
    return this.prisma.user.findMany({
      where: {
        userRoles: {
          some: {
            role: {
              name: Role.COMMON,
            },
          },
        },
      },
    });
  }
}
