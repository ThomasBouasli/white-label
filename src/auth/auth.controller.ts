import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guard/local.guard';
import { ReqUser } from './decorator/user.decorator';
import { UserWithRolesDTO } from './dto/user-with-roles';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@ReqUser() user: UserWithRolesDTO) {
    return this.authService.login(user);
  }

  @Get('profile')
  getProfile(@ReqUser() user: UserWithRolesDTO) {
    return user;
  }

  @Get('roles')
  getRoles() {
    return this.authService.getRoles();
  }
}
