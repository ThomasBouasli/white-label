import { Field, ObjectType } from '@nestjs/graphql';

import { User } from '@/app/infra/database/entities/user.entity';

import { AuthTokenDTO } from './auth-token.dto';

@ObjectType()
export class LoginDataDTO {
  @Field()
  auth_token: AuthTokenDTO;

  @Field()
  user: User;
}
