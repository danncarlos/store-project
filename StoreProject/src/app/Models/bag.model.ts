import { Produto } from "./produto.model";

export class Bag{

    constructor(prod: Produto, qtd: number){
        this.produto = prod;
        this.quantidade = qtd;
      }

    produto!: Produto;
    quantidade!: number;

    addProd(): void{
        this.quantidade++;
    }
}