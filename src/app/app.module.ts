import { Global, Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { AuthModule } from '@/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PrismaService } from './infra/database';
import { CommonModule } from '@/common/common.module';
import { AdminModule } from '@/admin/admin.module';
import { AuthService } from '@/auth/auth.service';

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
