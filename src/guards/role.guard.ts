import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from 'src/decorators/roles.decorator';
import { RoleEnum } from 'src/enums/role.enum';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<RoleEnum[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredRoles) return true;

    const request = context.switchToHttp().getRequest();

    // Verifica se o resultado do filtro é maior que zero (Se o usuario tem a permissão necessaria)
    if (requiredRoles.filter((role) => role <= request.user.role).length > 0) {
      return true;
    } else {
      throw new UnauthorizedException(
        'O Nivel de acesso do usuario não permite o consumo deste serviço.',
      );
    }
  }
}
