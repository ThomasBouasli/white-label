import { Response } from 'express';

import { Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { Auth } from './decorator/auth.decorator';
import { Public } from './decorator/public.decorator';
import { ReqUser } from './decorator/user.decorator';
import { UserWithRolesDTO } from './dto/user-with-roles.dto';
import { LocalAuthGuard } from './guard/local.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Res() response: Response, @ReqUser() data: UserWithRolesDTO) {
    const { access_token, user } = await this.authService.login(data);

    response.cookie('jwt', access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
    });

    return response.json({ user });
  }

  @Public()
  @Get('logout')
  async logout(@Res() response: Response) {
    response.clearCookie('jwt');

    return response.json({ message: 'Logout success' });
  }

  @Auth()
  @Get('profile')
  getProfile(@ReqUser() user: UserWithRolesDTO) {
    return user;
  }

  @Get('roles')
  getRoles() {
    return this.authService.getRoles();
  }
}
