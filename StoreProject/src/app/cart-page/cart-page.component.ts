import { Component, OnInit } from '@angular/core';
import { ProdutoServiceService } from '../random-prods/produto-service.service';
import { prod } from '../random-prods/random-prods.component';
import Swal from 'sweetalert2'
import { Produto } from '../Models/produto.model';
import { Bag } from '../Models/bag.model';
import { Compras } from '../Models/compras.model';

import { from } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css',  '../style/main.css']
})
export class CartPageComponent implements OnInit {

  constructor(private produtoService: ProdutoServiceService, private router: Router) { }

  ngOnInit(): void {
    
    this.produtoService.getBagItems().subscribe((data)=>{
      this.produtoList = data;
    });
    
    // this._populateCart();
    this.bag = this.produtoService.populateBag(this.produtoList);
    this._totalPrice();
    
  }

  items: prod[] = [];

  cartProduts: CartProduts[] = [];

  totalPrice: number = 0;
  isBuyDisable = false;

  //Final from Api
  produtoList: Produto[] = [];
  bag: Bag[] = [];

  _populateCart(){
    let cart: Bag[] = [];
    for(var i = 0; i < this.produtoList.length; i++){
      if(!cart.map(x=>x.produto.id).includes(this.produtoList[i].id)){
        cart.push(new Bag(this.produtoList[i], 1));
      }
      else{
        cart.find(x=>x.produto.id == this.produtoList[i].id)?.addProd();
      }
    }

    this.bag = cart;
    // return cart;
  }

  _totalPrice(){
    let _total = 0;
    this.bag.forEach(item => {
      _total += (item?.produto.preco * item?.quantidade);
    });

    this.totalPrice = _total;
  }

  addProduto(data: any){
    this.produtoService.addItemToBag(data.produto);
    this.update();
  }

  removerProduto(data: any){
    if(data.quantidade <= 1){
      Swal.fire({
        title: 'Atenção',
        text: "Tem certeza que deseja remover esse produto do carrinho?",
        icon: 'warning',
        showCancelButton: true,
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#4a9e1b',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sim, remover!'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            'Produto removido!',
            'Seu produto foi removido do carrinho.',
            'success'
          );
         
          // let index = this.cartProduts.indexOf(data);
          // this.cartProduts.splice(index, 1);
          this.produtoService.removeBagItem(data.produto.id);

          this.update();
        }
      });
    }
    else{
      this.produtoService.removeBagItem(data.produto.id);
      this.update();

    }
  }

  completePurchase(){
    if(this.bag.length < 1) return;

    var compras = new Compras();
    compras.compras = this.bag;

    this.router.navigate(['/login']);
  }

  _clearBag(){
    this.produtoService.clearBag();
    this.bag = [];
    this.totalPrice = 0;
    this.isBuyDisable = true;
  }

  update(): void {
    this.produtoService.getBagItems().subscribe(result => this.produtoList = result);
    this.bag = [];
    this._populateCart();
    this._totalPrice();
  }



}


export class CartProduts{
  
  constructor(prod: prod, qtd: number){
    this.produto = prod;
    this.qtd = qtd;
  }

  produto!: prod;
  qtd!: number;
  
  addProd(){
    this.qtd++;
  }

}