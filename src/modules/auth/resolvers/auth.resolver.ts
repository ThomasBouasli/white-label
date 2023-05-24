import { Request, Response } from 'express';

import { Args, Context, Query, Resolver } from '@nestjs/graphql';

import { User } from '@/app/infra/database/entities/user.entity';

import { Auth } from '../decorators/auth.decorator';
import { CurrentUser } from '../decorators/current-user.decorator';
import { LoginDataDTO } from '../dto/login-data.dto';
import { LoginDTO } from '../dto/login.dto';
import { AuthService } from '../services/auth.service';

@Resolver('Auth')
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Query(() => LoginDataDTO, { name: 'login' })
  async login(
    @Args('data') data: LoginDTO,
    @Context('res') res: Response,
  ): Promise<LoginDataDTO> {
    const auth = await this.authService.login(data);

    res.cookie('token', auth.auth_token.access_token, {
      httpOnly: true,
    });

    return auth;
  }

  @Query(() => String, { name: 'logout' })
  async logout(@Context('req') req: Request, @Context('res') res: Response) {
    res.clearCookie('token');

    return 'OK';
  }

  @Auth('read:self')
  @Query(() => User, { name: 'me' })
  async me(@CurrentUser() user: User): Promise<User> {
    return user;
  }
}
