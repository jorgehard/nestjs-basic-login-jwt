import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from 'src/modules/auth/auth.service';
import { UserService } from 'src/modules/user/user.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const { authorization } = request.headers;

    //Verifica se o token é valido, do contrario ocorre o erro
    try {
      request.token = this.authService.checkToken(authorization.split(' ')[1]);
      request.user = await this.userService.show(request.token.id);
      return true;
    } catch (e) {
      throw new UnauthorizedException('Token informado não é valido');
    }
  }
}
