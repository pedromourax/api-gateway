import { ArrayMinSize, IsArray, IsOptional, IsString } from "class-validator";


export class atualizarCategoriaDto {

    @IsString()
    @IsOptional()
    descricao: string

    @IsArray()
    @ArrayMinSize(1)
    evento: Array<Evento>

}

export interface Evento {
    nome: string,
    operacao: string,
    valor: number
}