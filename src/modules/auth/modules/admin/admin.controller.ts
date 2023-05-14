import { Response } from 'express';

import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { Auth } from '@/modules/auth/decorator/auth.decorator';
import { Public } from '@/modules/auth/decorator/public.decorator';
import { Roles } from '@/modules/auth/decorator/roles.decorator';

import { RegisterUserDTO } from '@/modules/auth/dto/register-user.dto';

import { Role } from '@/modules/auth/enum/role.enum';

import { AdminService } from './admin.service';

@ApiTags('auth')
@Auth(Role.ADMIN)
@Controller('auth/admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Public()
  @Post('register')
  async registerUser(@Res() response: Response, @Body() body: RegisterUserDTO) {
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
