import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreatePermissionGroupDTO {
  @Field()
  name: string;
}
