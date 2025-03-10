import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // get the request url
    // check if is test environment
    if (process.env.NODE_ENV === 'test') {
      return next.handle();
    }
    console.warn('START REQUEST...', context.switchToHttp().getRequest().url);
    const now = Date.now();
    return next
      .handle()
      .pipe(
        tap(() =>
          console.warn(
            `FINISH REQUEST... ${Date.now() - now}ms`,
            context.switchToHttp().getRequest().url,
          ),
        ),
      );
  }
}
