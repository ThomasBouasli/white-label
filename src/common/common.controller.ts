import { Response } from 'express';

import { Body, Controller, Get, Post, Res } from '@nestjs/common';

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
  async registerUser(
    @Res() response: Response,
    @Body() body: { email: string; password: string },
  ) {
    const { user, access_token } = await this.commonService.registerUser(body);

    response.cookie('auth', access_token, {
      httpOnly: true,
    });

    return response.json({ user });
  }

  @Get('users')
  async getAllUsers() {
    return this.commonService.getAllUsers();
  }
}
