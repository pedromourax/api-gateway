import { BadRequestException, Body, Controller, Delete, Get, Logger, Param, Post, Put, Query } from '@nestjs/common';
import { Observable } from 'rxjs';
import { atualizarJogadorDto } from 'src/common/dtos/atualizar-jogador.dto';
import { CriarJogadorDto } from 'src/common/dtos/criar-jogador.dto';
import { ClientProxySmartRanking } from 'src/proxyrmq/proxyrmq.service';

@Controller('api/v1/jogadores')
export class JogadoresController {

    constructor(private readonly ClientProxySmartRanking: ClientProxySmartRanking) { }

    private ClientAdminBackend = this.ClientProxySmartRanking.getClientProxyAdminBackend()

    private logger = new Logger(JogadoresController.name)

    @Post()
    async criarJogador(@Body() criarJogador: CriarJogadorDto) {
        this.logger.log('CATEGORIA?', JSON.stringify(criarJogador.categoria))
        const categoria = await this.ClientAdminBackend.send('consultar-categoria', criarJogador.categoria ? criarJogador.categoria : () => { throw new BadRequestException('Categoria não informada') })
        if (!categoria) {
            throw new BadRequestException('Categoria não encontrada')
        } else {
            await this.ClientAdminBackend.emit('criar-jogador', criarJogador)
        }
    }

    @Get()
    consultarJogadores(@Query('idJogador') idJogador: string): Observable<any> {
        return this.ClientAdminBackend.send('consultar-jogadores', { idJogador })
    }

    @Put()
    async atualizarJogador(@Body() atualizarJogador: atualizarJogadorDto) {
        if (atualizarJogador.categoria) {
            const categoria = await this.ClientAdminBackend.send('consultar-categoria', atualizarJogador.categoria ? atualizarJogador.categoria : () => { throw new BadRequestException('Categoria não encontrada') })
        }
        return await this.ClientAdminBackend.emit('atualizar-jogador', atualizarJogador)
    }

    @Delete(':_id')
    async deletarJogador(@Param('_id') _id: string) {

        const jogador = await this.ClientAdminBackend.send('consultar-jogadores', _id)
        if (!jogador) throw new BadRequestException('Jogador não encontrado')

        return await this.ClientAdminBackend.emit('deletar-jogador', _id)
    }


}
