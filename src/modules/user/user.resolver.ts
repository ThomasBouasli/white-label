import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { User } from '@/app/infra/database/entities/user.entity';

import { Auth } from '../auth/decorators/auth.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { RegisterUserDTO } from './dto/register-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { UserService } from './user.service';

@Resolver('User')
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => User, { name: 'registerUser' })
  registerUser(@Args('data') data: RegisterUserDTO): Promise<User> {
    return this.userService.register(data);
  }

  @Auth('update:self')
  @Mutation(() => User, { name: 'updateUser' })
  updateUser(
    @CurrentUser('id') id: string,
    @Args('data') data: UpdateUserDTO,
  ): Promise<User> {
    return this.userService.update(id, data);
  }

  @Auth('delete:self')
  @Mutation(() => Boolean, { name: 'deleteUser' })
  deleteUser(@CurrentUser('id') id: string): Promise<boolean> {
    return this.userService.delete(id);
  }

  @Auth('read:self')
  @Mutation(() => User, { name: 'me' })
  getProfile(@CurrentUser() user: User) {
    return user;
  }
}
