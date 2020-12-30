import { Bag } from "./bag.model";

export interface HistoricoCompras {
    userId: string;
    compras: Bag[];
    totalCompra: number;
    id: string;
    ativo: boolean;
    dtCriacao: Date;
}