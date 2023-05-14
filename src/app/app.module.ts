import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

import { AuthModule } from '@/modules/auth/auth.module';

import { AuthService } from '@/modules/auth/auth.service';

import { PrismaService } from './infra/database';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot(),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
    AuthModule,
  ],
  providers: [PrismaService, AuthService],
  exports: [JwtModule, PrismaService, AuthService],
})
export class AppModule {}
