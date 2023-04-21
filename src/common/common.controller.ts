import { Body, Controller, Get, Post } from '@nestjs/common';

import { Auth } from '@/auth/decorator/auth.decorator';
import { Public } from '@/auth/decorator/public.decorator';

import { Role } from '@/auth/enum/role.enum';

import { CommonService } from './common.service';

@Auth(Role.COMMON)
@Controller('common')
export class CommonController {
  constructor(private readonly commonService: CommonService) {}

  @Public()
  @Post('register')
  async registerUser(@Body() body: { email: string; password: string }) {
    return this.commonService.registerUser(body);
  }

  @Get('users')
  async getAllUsers() {
    return this.commonService.getAllUsers();
  }
}
