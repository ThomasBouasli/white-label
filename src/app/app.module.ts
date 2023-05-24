import { Module } from '@nestjs/common';

import { AuthModule } from '@/modules/auth/auth.module';
import { UserModule } from '@/modules/user/user.module';

import { InfraModule } from './infra/infra.module';

@Module({
  imports: [AuthModule, UserModule, InfraModule],
})
export class AppModule {}
