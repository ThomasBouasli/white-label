import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from '@/app/infra/database/entities/user.entity';

import { UserResolver } from './user.resolver';
import { UserService } from './user.service';
import { EmailAlreadyInUseValidator } from './validator/email-already-in-use.validator';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserResolver, UserService, EmailAlreadyInUseValidator],
  exports: [UserService],
})
export class UserModule {}
