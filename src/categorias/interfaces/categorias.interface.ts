import { Jogador } from "src/jogadores/interfaces/jogador.interface";

export interface Categoria {
    readonly _id: string;
    readonly categoria: string;
    readonly eventos: Array<Evento>;
    readonly jogadores: Array<Jogador>;
}

export interface Evento {
    nome: string;
    operacao: string;
    valor: number;
}