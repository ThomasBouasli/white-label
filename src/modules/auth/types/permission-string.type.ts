import { PermissionAction } from '@/app/infra/database/enum/permission-action.enum';
import { PermissionResource } from '@/app/infra/database/enum/permission-resource.enum';

export type PermissionString = `${PermissionAction}:${PermissionResource}`;
