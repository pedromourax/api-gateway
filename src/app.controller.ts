import { Body, Controller, Get, Logger, Post } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';
import { CriarCategoriaDto } from './dtos/criar-categoria.dto';

@Controller('api/v1')
export class AppController {

  private logger = new Logger(AppController.name);

  private clientAdminBackend: ClientProxy

  constructor() {
    this.clientAdminBackend = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://user:gVndBrn6v6B+@54.144.53.194:5672/smartranking'],
        queue: 'admin-backend',
      }
    }
    )
  }

  @Post('categorias')
  async criarCategoria(@Body() criarCategoria: CriarCategoriaDto) {
    return await this.clientAdminBackend.emit('criar-categoria', criarCategoria)
  }


}
