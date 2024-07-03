import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Role } from 'src/modules/user/roles.enum';
import { ROLES_KEY } from '../decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector, private jwtService: JwtService) { }

    canActivate(context: ExecutionContext): boolean {
        const roles = this.reflector.get<Role[]>(ROLES_KEY, context.getHandler());
        if (!roles) {
            return true;
        }

        const request = context.switchToHttp().getRequest();
        const token = request.headers.authorization?.split(' ')[1];
        if (!token) {
            throw new UnauthorizedException('Acceso no autorizado, falta el token');
        }

        const user = this.jwtService.verify(token, { secret: process.env.JWT_SECRET });
        if (!roles.includes(user.role)) {
            throw new UnauthorizedException('Acceso no autorizado');
        }

        request.user = user;
        return true;
    }
}
