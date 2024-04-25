import { Module } from '@nestjs/common';
import { DesafiosController } from './desafios.controller';
import { ProxyrmqModule } from 'src/proxyrmq/proxyrmq.module';

@Module({
  controllers: [DesafiosController],
  imports: [ProxyrmqModule]
})
export class DesafiosModule { }
