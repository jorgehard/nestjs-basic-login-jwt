/*
https://docs.nestjs.com/interceptors#interceptors
*/

import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LogInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // Before
    const dt = Date.now();

    return next.handle().pipe(tap(() => {
      // After
      console.log(`URL: ${context.switchToHttp().getRequest().url}`);
      console.log(`Execução levou: ${Date.now() - dt} milisegundos.`);
      //TO DO: Criar um serviço de log ligando o banco de dados
    }));
  }
}
