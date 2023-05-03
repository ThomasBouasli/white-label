import { Response } from 'express';

import { Body, Controller, Get, Post, Res } from '@nestjs/common';

import { Auth } from '@/auth/decorator/auth.decorator';
import { Public } from '@/auth/decorator/public.decorator';
import { Roles } from '@/auth/decorator/roles.decorator';

import { Role } from '@/auth/enum/role.enum';

import { AdminService } from './admin.service';

@Auth(Role.ADMIN)
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Public()
  @Post('register')
  async registerUser(
    @Res() response: Response,
    @Body() body: { email: string; password: string },
  ) {
    const { user, access_token } = await this.adminService.registerUser(body);

    response.cookie('auth', access_token, {
      httpOnly: true,
    });

    return response.json({ user });
  }

  @Roles(Role.ADMIN)
  @Get('users')
  async getAllUsers() {
    return this.adminService.getAllUsers();
  }
}
