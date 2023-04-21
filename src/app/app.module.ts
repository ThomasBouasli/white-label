import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

import { AdminModule } from '@/admin/admin.module';
import { AuthModule } from '@/auth/auth.module';
import { CommonModule } from '@/common/common.module';

import { AuthService } from '@/auth/auth.service';

import { AppController } from './app.controller';
import { AppService } from './app.service';
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
    CommonModule,
    AdminModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService, AuthService],
  exports: [JwtModule, PrismaService, AuthService],
})
export class AppModule {}
