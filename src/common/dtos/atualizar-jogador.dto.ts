import { IsNotEmpty, IsOptional, IsPhoneNumber } from "class-validator";

export class atualizarJogadorDto {

    @IsNotEmpty()
    @IsPhoneNumber("BR", { message: "Número de telefone inválido" })
    telefone: string;

    @IsNotEmpty()
    nome: string;

    @IsOptional()
    categoria: string
}