import { Module } from '@nestjs/common';
import { CategoriasModule } from './categorias/categorias.module';
import { JogadoresModule } from './jogadores/jogadores.module';
import { ProxyrmqModule } from './proxyrmq/proxyrmq.module';
import { AwsModule } from './aws/aws.module';
import { ConfigModule } from '@nestjs/config'


@Module({
  imports: [CategoriasModule, JogadoresModule, ProxyrmqModule, AwsModule,
    ConfigModule.forRoot({
      isGlobal: true
    })
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
