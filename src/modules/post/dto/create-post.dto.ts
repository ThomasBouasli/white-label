import { IsNotEmpty } from 'class-validator';

import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreatePostDTO {
  @Field()
  @IsNotEmpty()
  title: string;

  @Field()
  @IsNotEmpty()
  content: string;
}
