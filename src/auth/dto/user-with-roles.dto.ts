import { User, UserRoles } from '@prisma/client';

export type UserWithRolesDTO = User & {
  userRoles: (UserRoles & {
    role: {
      name: string;
    };
  })[];
};
