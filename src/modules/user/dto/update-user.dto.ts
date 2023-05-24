import { InputType, OmitType, PartialType } from '@nestjs/graphql';

import { RegisterUserDTO } from './register-user.dto';

@InputType()
class RequiredUpdateUserDTO extends OmitType(RegisterUserDTO, ['password']) {}

@InputType()
export class UpdateUserDTO extends PartialType(RequiredUpdateUserDTO) {}
