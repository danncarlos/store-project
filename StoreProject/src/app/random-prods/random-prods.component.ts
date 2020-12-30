import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import {ProdutoServiceService} from 'src/app/random-prods/produto-service.service';
import { Produto } from '../Models/produto.model';

@Component({
  selector: 'app-random-prods',
  templateUrl: './random-prods.component.html',
  styleUrls: ['./random-prods.component.css', '../style/main.css']
})
export class RandomProdsComponent implements OnInit {
  
  prodList: prod[] = [];
  produtoList: Produto[] = [];
  
  constructor(private _snackBar: MatSnackBar, private produtoServiceService: ProdutoServiceService) { }

  ngOnInit(): void {


    this.produtoServiceService.getAllStoreItems().subscribe((data)=>{
      this.produtoList = data;
    });

   }

  produtoDesc(descricao: string){
    // return descricao.trn
    var final = descricao.slice(0, 80);
    if(descricao.length > 80)
      final+= "...";

    return final;
  }

  openSnackBar(msg: string) {
    this._snackBar.open(msg, "fechar", {
      horizontalPosition: 'end',
      duration: 2000,
    });
  }
    
  addToFavorite(item: any){
    if(item.isFav == false){
      item.isFav = true;
      this.openSnackBar('item adicionado aos favoritos!');
    }
    else{
      item.isFav = false;
      this.openSnackBar('item removido dos favoritos!');
    }
  }

  btnComprar(produto: Produto){
    this.produtoServiceService.addItemToBag(produto);
  }

}

export class prod{
  prodId!: string;
  prodName!: string;
  prodDesc!: string;
  prodImage!: string;
  storeUrl!: string;
  prodPreco: number = 0;
  isFav: boolean = false;
}
