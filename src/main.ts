import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionFilter } from './common/filters/http-exception.filter';
import * as momentTimezone from 'moment-timezone';
import { LogginInterceptor } from './common/interceptors/logging.interceptor';
import { TimeoutInterceptor } from './common/interceptors/timeout.interceotor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalInterceptors(new LogginInterceptor, new TimeoutInterceptor);
  app.useGlobalFilters(new AllExceptionFilter);

  Date.prototype.toJSON = (): any => {
    return momentTimezone(this).tz('America/Sao_Paulo').format('YYYY-MM-DD HH:mm:ss');
  }

  await app.listen(3000);
}
bootstrap();
