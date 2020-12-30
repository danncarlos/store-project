export interface Produto {
    id: string;
    nome: string;
    descricao: string;
    imagemUrl: string;
    preco: number;
    ativo: boolean;
    dtCriacao: Date;

    isFav: boolean;
}
