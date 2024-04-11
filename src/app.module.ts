import { Module } from '@nestjs/common';
import { CategoriasModule } from './categorias/categorias.module';
import { JogadoresModule } from './jogadores/jogadores.module';
import { ProxyrmqModule } from './proxyrmq/proxyrmq.module';

@Module({
  imports: [CategoriasModule, JogadoresModule, ProxyrmqModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
