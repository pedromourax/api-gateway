import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from '@nestjs/common'
import { Observable, tap } from 'rxjs';


@Injectable()
export class LogginInterceptor implements NestInterceptor {

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        console.log('Antes... ')
        const now = Date.now();

        return next.handle().pipe(
            tap(() => Logger.log(`Depois... ${Date.now() - now}ms`))
        )

    }
}