import { SetMetadata, UseGuards, applyDecorators } from '@nestjs/common';

import { JwtAuthGuard } from '../guards/jwt.guard';
import { PermissionGuard } from '../guards/permission.guard';
import { PermissionString } from '../types/permission-string.type';
import { PERMISSION_KEY } from './permission.decorator';

export function Auth(...permissions: PermissionString[]) {
  return applyDecorators(
    SetMetadata(PERMISSION_KEY, permissions),
    UseGuards(JwtAuthGuard, PermissionGuard),
  );
}
