import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class RemovePermissionsToGroupDTO {
  @Field()
  groupId: string;

  @Field(() => [String])
  permissionIds: string[];
}
