import { IsArray, IsNotEmpty, IsString } from "class-validator"
import { Evento } from "./atualizar-categoria.dto"


export class CriarCategoriaDto {

    @IsString()
    @IsNotEmpty()
    readonly categoria: string

    @IsString()
    readonly descricao: string

    @IsArray()
    readonly eventos: Array<Evento>
}