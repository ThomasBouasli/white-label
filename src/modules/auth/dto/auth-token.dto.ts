import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AuthTokenDTO {
  @Field()
  access_token: string;
}
