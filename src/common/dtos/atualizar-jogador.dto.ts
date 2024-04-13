import { IsNotEmpty, IsOptional, IsPhoneNumber } from "class-validator";

export class atualizarJogadorDto {

    @IsOptional()
    @IsPhoneNumber("BR", { message: "Número de telefone inválido" })
    telefone?: string;

    @IsOptional()
    nome?: string;

    @IsOptional()
    categoria?: string

    @IsOptional()
    urlFotoPerfil?: string
}