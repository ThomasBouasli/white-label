import { OmitType, PartialType } from '@nestjs/swagger';

import { RegisterUserDTO } from './register-user.dto';

class RegisterUserDTOWithoutPassword extends OmitType(RegisterUserDTO, [
  'password',
]) {}

export class UpdateUserDTO extends PartialType(
  RegisterUserDTOWithoutPassword,
) {}
