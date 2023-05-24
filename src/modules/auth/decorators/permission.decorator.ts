import { SetMetadata } from '@nestjs/common';

import { PermissionString } from '../types/permission-string.type';

export const PERMISSION_KEY = 'roles';
export const Permissions = async (...permissions: PermissionString[]) => {
  SetMetadata(PERMISSION_KEY, permissions);
};
