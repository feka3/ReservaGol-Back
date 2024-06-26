import { SetMetadata } from '@nestjs/common';
import { Role } from 'src/user/roles.enum';

export const Roles = (...roles: Role[]): MethodDecorator & ClassDecorator => {
  return SetMetadata('role', roles);
};
