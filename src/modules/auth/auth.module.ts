import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PermissionGroup } from '@/app/infra/database/entities/permission-group.entity';
import { Permission } from '@/app/infra/database/entities/permission.entity';

import { UserModule } from '../user/user.module';
import { AuthResolver } from './resolvers/auth.resolver';
import { PermissionGroupResolver } from './resolvers/permission-group.resolver';
import { PermissionResolver } from './resolvers/permission.resolver';
import { AuthService } from './services/auth.service';
import { PermissionGroupService } from './services/permission-group.service';
import { PermissionService } from './services/permission.service';
import { JwtStrategy } from './strategies/jwt.strategy';

@Global()
@Module({
  imports: [
    UserModule,
    TypeOrmModule.forFeature([Permission, PermissionGroup]),
  ],
  providers: [
    AuthService,
    PermissionService,
    PermissionGroupService,
    AuthResolver,
    PermissionResolver,
    PermissionGroupResolver,
    JwtStrategy,
  ],
  exports: [AuthService],
})
export class AuthModule {}
