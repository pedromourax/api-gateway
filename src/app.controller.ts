import { Body, Controller, Get, Logger, Param, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';
import { CriarCategoriaDto } from './dtos/criar-categoria.dto';
import { Observable } from 'rxjs';
import { atualizarCategoriaDto } from './dtos/atualizar-categoria.dto';

@Controller('api/v1/categorias')
export class AppController {

  private logger = new Logger(AppController.name);

  private clientAdminBackend: ClientProxy

  constructor() {
    this.clientAdminBackend = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://user:gVndBrn6v6B+@54.160.160.41:5672/smartranking'],
        queue: 'admin-backend',
      }
    }
    )
  }

  @Post()
  async criarCategoria(@Body() criarCategoria: CriarCategoriaDto) {
    return await this.clientAdminBackend.emit('criar-categoria', criarCategoria)
  }

  @Get()
  consultarCategorias(@Query('idCategoria') idCategoria: string): Observable<any> {

    return this.clientAdminBackend.send('consultar-categoria', idCategoria ? idCategoria : '')

  }

  @Put(':_id')
  @UsePipes(ValidationPipe)
  atualizarCategorias(@Param('_id') _id: string, @Body() atualizarCategorias: atualizarCategoriaDto) {

    return this.clientAdminBackend.emit('atualizar-categoria', { _id, ...atualizarCategorias })

  }


}
