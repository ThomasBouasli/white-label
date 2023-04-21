import { Body, Controller, Get, Post } from '@nestjs/common';

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
  async registerUser(@Body() body: { email: string; password: string }) {
    return this.adminService.registerUser(body);
  }

  @Roles(Role.ADMIN)
  @Get('users')
  async getAllUsers() {
    return this.adminService.getAllUsers();
  }
}
