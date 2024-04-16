// response.interceptor.ts

import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => ({
        success: true,
        data,
        statusCode: HttpStatus.OK,
      })),
      catchError((error) => {
        if (error instanceof HttpException) {
          // 如果是 HttpException，则直接抛出错误
          throw error;
        } else {
          // 对于其他类型的错误，统一封装成 500 错误
          const message = error.message || 'Internal Server Error';
          const statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
          return throwError(
            new HttpException({ success: false, message }, statusCode),
          );
        }
      }),
    );
  }
}
