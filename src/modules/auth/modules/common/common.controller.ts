import { Response } from 'express';

import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { Auth } from '@/modules/auth/decorator/auth.decorator';
import { Public } from '@/modules/auth/decorator/public.decorator';

import { RegisterUserDTO } from '@/modules/auth/dto/register-user.dto';

import { Role } from '@/modules/auth/enum/role.enum';

import { CommonService } from './common.service';

@ApiTags('auth')
@Auth(Role.COMMON)
@Controller('auth/common')
export class CommonController {
  constructor(private readonly commonService: CommonService) {}

  @Public()
  @Post('register')
  async registerUser(@Res() response: Response, @Body() body: RegisterUserDTO) {
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
