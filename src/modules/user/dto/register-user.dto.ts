import { IsEmail, IsNotEmpty, Validate } from 'class-validator';

import { Field, InputType } from '@nestjs/graphql';

import { EmailAlreadyInUseValidator } from '../validator/email-already-in-use.validator';

@InputType()
export class RegisterUserDTO {
  @Field()
  @IsNotEmpty()
  name: string;

  @Field()
  @IsNotEmpty()
  @IsEmail()
  @Validate(EmailAlreadyInUseValidator)
  email: string;

  @Field()
  @IsNotEmpty()
  password: string;
}
