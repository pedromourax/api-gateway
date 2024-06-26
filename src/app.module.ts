import { Module } from '@nestjs/common';
import { CategoriasModule } from './categorias/categorias.module';
import { JogadoresModule } from './jogadores/jogadores.module';
import { ProxyrmqModule } from './proxyrmq/proxyrmq.module';
import { AwsModule } from './aws/aws.module';
import { ConfigModule } from '@nestjs/config'
import { DesafiosModule } from './desafios/desafios.module';


@Module({
  imports: [CategoriasModule, JogadoresModule, ProxyrmqModule, AwsModule,
    ConfigModule.forRoot({
      isGlobal: true
    }),
    DesafiosModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
