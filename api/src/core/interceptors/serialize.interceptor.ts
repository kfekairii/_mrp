import {
  CallHandler,
  ExecutionContext,
  NestInterceptor,
  UseInterceptors,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { map, Observable } from 'rxjs';

interface ClassConstactor {
  new (...args: any[]): unknown;
}

export function Serialze(dto: ClassConstactor) {
  return UseInterceptors(new SerialzeInterceptor(dto));
}

export class SerialzeInterceptor implements NestInterceptor {
  constructor(private readonly dto: any) {}
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    // Run some code befor a request handling
    return next.handle().pipe(
      map((data: any) => {
        // Run some code befor the response was sent
        return plainToInstance(this.dto, data, {
          excludeExtraneousValues: true,
        });
      }),
    );
  }
}
