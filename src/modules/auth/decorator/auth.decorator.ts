import { SetMetadata, UseGuards, applyDecorators } from '@nestjs/common';

import { Role } from '../enum/role.enum';
import { JwtAuthGuard } from '../guard/jwt.guard';
import { RolesGuard } from '../guard/role.guard';

export function Auth(...roles: Role[]) {
  return applyDecorators(
    SetMetadata('roles', roles),
    UseGuards(JwtAuthGuard, RolesGuard),
  );
}
