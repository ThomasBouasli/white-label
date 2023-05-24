import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class AddPermissionsToGroupDTO {
  @Field()
  groupId: string;

  @Field(() => [String])
  permissionIds: string[];
}
