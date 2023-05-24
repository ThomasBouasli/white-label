import { Field, InputType } from '@nestjs/graphql';

import { PermissionAction } from '@/app/infra/database/enum/permission-action.enum';
import { PermissionResource } from '@/app/infra/database/enum/permission-resource.enum';

@InputType()
export class CreatePermissionDTO {
  @Field()
  action: PermissionAction;

  @Field()
  resource: PermissionResource;
}
