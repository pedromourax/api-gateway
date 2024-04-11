import { IsEmail, IsNotEmpty, IsPhoneNumber } from "class-validator";

export class CriarJogadorDto {
    @IsEmail()
    email: string;

    @IsPhoneNumber("BR", { message: "Número de telefone inválido" })
    telefone: string;

    @IsNotEmpty()
    nome: string;

    @IsNotEmpty()
    categoria: string;
}