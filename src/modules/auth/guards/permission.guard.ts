import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';

import { User } from '@/app/infra/database/entities/user.entity';

import { PERMISSION_KEY } from '../decorators/permission.decorator';
import { AuthService } from '../services/auth.service';
import { PermissionString } from '../types/permission-string.type';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(private reflector: Reflector, private authService: AuthService) {}

  async canActivate(ctx: ExecutionContext): Promise<boolean> {
    const context = GqlExecutionContext.create(ctx);

    const requiredPermissions = this.reflector.getAllAndOverride<
      PermissionString[]
    >(PERMISSION_KEY, [context.getHandler(), context.getClass()]);
    if (!requiredPermissions || requiredPermissions.length === 0) {
      return true;
    }

    const req = context.getContext().req;
    const user = req.user as User;

    return await this.authService.hasPermission(user.id, requiredPermissions);
  }
}
