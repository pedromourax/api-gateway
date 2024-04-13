import { BadRequestException, Body, Controller, Delete, Get, Logger, NotFoundException, Param, Post, Put, Query, UploadedFile, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { url } from 'inspector';
import { Observable, lastValueFrom } from 'rxjs';
import { AwsService } from 'src/aws/aws.service';
import { atualizarJogadorDto } from 'src/common/dtos/atualizar-jogador.dto';
import { CriarJogadorDto } from 'src/common/dtos/criar-jogador.dto';
import { ClientProxySmartRanking } from 'src/proxyrmq/proxyrmq.service';

@Controller('api/v1/jogadores')
export class JogadoresController {

    constructor(
        private readonly ClientProxySmartRanking: ClientProxySmartRanking,
        private readonly awsService: AwsService
    ) { }

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


    @Post('/upload/:id')
    @UseInterceptors(FileInterceptor('file'))
    async uploadArquivo(@Param('id') id: string, @UploadedFile() file: any) {

        const jogador = await this.ClientAdminBackend.send('consultar-jogadores', { idJogador: id })

        const JogadorExiste = await lastValueFrom(jogador)
        if (!JogadorExiste) throw new NotFoundException('Jogador não encontrado')

        const urlFotoPerfil = await this.awsService.uploadArquivo(file, id)

        const atualizarJogador: atualizarJogadorDto = {
            urlFotoPerfil: urlFotoPerfil["url"]
        }

        await this.ClientAdminBackend.emit('atualizar-jogador', { idJogador: id, ...atualizarJogador })

        return await this.ClientAdminBackend.send('consultar-jogadores', { idJogador: id })
    }


    @Get()
    consultarJogadores(@Query('idJogador') idJogador: string): Observable<any> {
        return this.ClientAdminBackend.send('consultar-jogadores', { idJogador })
    }

    @Put(':idJogador')
    @UsePipes(ValidationPipe)
    async atualizarJogador(@Param('idJogador') idJogador: string, @Body() atualizarJogador: atualizarJogadorDto) {
        if (atualizarJogador.categoria) {
            const categoria = await this.ClientAdminBackend.send(
                'consultar-categoria',
                atualizarJogador.categoria ? atualizarJogador.categoria : () => { throw new NotFoundException('Categoria não encontrada') })
            this.logger.log(categoria)

        }
        const jogador = await this.ClientAdminBackend.send('consultar-jogadores', { idJogador })

        const JogadorExiste = await lastValueFrom(jogador)
        if (!JogadorExiste) throw new NotFoundException('Jogador não encontrado')

        return await this.ClientAdminBackend.emit('atualizar-jogador', { idJogador, ...atualizarJogador })
    }

    @Delete(':idJogador')
    async deletarJogador(@Param('idJogador') idJogador: string) {

        const jogador = await this.ClientAdminBackend.send('consultar-jogadores', { idJogador })

        const JogadorExiste = await lastValueFrom(jogador)
        if (!JogadorExiste) throw new NotFoundException('Jogador não encontrado')

        return await this.ClientAdminBackend.emit('deletar-jogador', idJogador)
    }


}
