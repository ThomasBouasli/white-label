import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from '@/app/infra/database/entities/user.entity';

@ValidatorConstraint({ name: 'emailAlreadyInUseValidator', async: true })
@Injectable()
export class EmailAlreadyInUseValidator
  implements ValidatorConstraintInterface
{
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async validate(email: string): Promise<boolean> {
    const user = await this.userRepository.findOneBy({ email });

    return !user;
  }

  defaultMessage(): string {
    return 'The email «$value» is already register.';
  }
}
