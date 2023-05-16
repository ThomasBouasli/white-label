import { Response } from 'express';

import { Body, Controller, Get, Post, Put, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { Auth } from '@/modules/auth/decorator/auth.decorator';
import { Public } from '@/modules/auth/decorator/public.decorator';

import { RegisterUserDTO } from '@/modules/auth/dto/register-user.dto';

import { Role } from '@/modules/auth/enum/role.enum';

import { ReqUser } from '../../decorator/user.decorator';
import { UpdateUserDTO } from '../../dto/update-user.dto';
import { UserWithRolesDTO } from '../../dto/user-with-roles.dto';
import { CommonService } from './common.service';

@ApiTags('auth')
@Auth(Role.COMMON)
@Controller('auth/common')
export class CommonController {
  constructor(private readonly commonService: CommonService) {}

  @Public()
  @Post()
  async registerUser(@Res() response: Response, @Body() body: RegisterUserDTO) {
    const { user, access_token } = await this.commonService.registerUser(body);

    response.cookie('auth', access_token, {
      httpOnly: true,
    });

    return response.json({ user });
  }

  @Put()
  async updateUser(
    @Body() body: UpdateUserDTO,
    @ReqUser() user: UserWithRolesDTO,
  ) {
    return this.commonService.updateUser({
      ...body,
      id: user.id,
    });
  }

  @Get('all')
  async getAllUsers() {
    return this.commonService.getAllUsers();
  }
}
