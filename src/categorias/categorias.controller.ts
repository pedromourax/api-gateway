import { Body, Controller, Get, Logger, Param, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { CriarCategoriaDto } from '../common/dtos/criar-categoria.dto';
import { Observable } from 'rxjs';
import { atualizarCategoriaDto } from '../common/dtos/atualizar-categoria.dto';
import { ClientProxySmartRanking } from 'src/proxyrmq/proxyrmq.service';

@Controller('api/v1/categorias')
export class CategoriasController {

    private logger = new Logger(CategoriasController.name);

    constructor(private readonly ClientProxySmartRanking: ClientProxySmartRanking) { }

    private clientAdminBackend = this.ClientProxySmartRanking.getClientProxyAdminBackend()

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
