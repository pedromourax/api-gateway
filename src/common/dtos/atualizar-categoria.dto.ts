import { ArrayMinSize, IsArray, IsOptional, IsString } from "class-validator";


export class atualizarCategoriaDto {

    @IsString()
    @IsOptional()
    descricao: string

    @IsArray()
    @ArrayMinSize(1)
    eventos: Array<Evento>

}

export interface Evento {
    nome: string,
    operacao: string,
    valor: number
}