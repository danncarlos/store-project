import { ThrowStmt } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { prod } from './random-prods.component';
import { Globals } from '../globals';
import { ProdutoApi } from '../api/produto.api';
import { Produto } from '../Models/produto.model';
import { Compras } from '../Models/compras.model';
import { Bag } from '../Models/bag.model';

@Injectable({
  providedIn: 'root'
})
export class ProdutoServiceService {

  private items: prod[] = [];
  private cartItemsCount: number = 0;

  private _bagItems: Produto[] = [];
  private _bagItemCount: number = 0;

  constructor(public globals: Globals, private _apiProduto: ProdutoApi) { }

  getAllStoreItems(){
    return this._apiProduto.getProdutos();
  }
  
  addItemToBag(item: Produto){
    this.getBagItems().subscribe(x=> this._bagItems = x);
    this.getBagItemCount().subscribe(x=> this._bagItemCount = x);

    this._bagItems.push(item);
    this._storeItems();
  }

  getBagItems(){
    var lista = localStorage.getItem('bagItems');
    if(lista != null) this._bagItems = JSON.parse(lista);

    return of(this._bagItems);
  }

  getBagItemCount(){
    var listaCount = localStorage.getItem('bagItemCount');
    if(listaCount != null) this._bagItemCount = JSON.parse(listaCount);

    return of(this._bagItemCount || 0);
  }

  removeBagItem(id: string){
    this.getBagItems().subscribe(x=> this._bagItems = x);
    let index = this._bagItems.findIndex(x=>x.id == id);
    this._bagItems.splice(index, 1);
    this._storeItems();
  }

  makePurchase(id: string){

    debugger;
    let content = new Compras();
    content.userId = id;
    
    let _bag: Produto[] = [];

    this.getBagItems().subscribe(x=> {
      _bag = x;
    })
    
    content.compras = this.populateBag(_bag);

    return this._apiProduto.postCompra(content);
  }

  clearBag(){
    debugger;
    this._bagItems = [];
    this._bagItemCount = 0;
    this._storeItems();
  }

  private _storeItems(){
    // localStorage.setItem('cartList', JSON.stringify(this.items));
    // localStorage.setItem('cartListCounter', JSON.stringify(this.items?.length || 0));

    localStorage.setItem('bagItems', JSON.stringify(this._bagItems));
    localStorage.setItem('bagItemCount', JSON.stringify(this._bagItems?.length || 0));
  }

  populateBag(bagItems: Produto[]){
    let cart: Bag[] = [];
    for(var i = 0; i < bagItems.length; i++){
      if(!cart.map(x=>x.produto.id).includes(bagItems[i].id)){
        cart.push(new Bag(bagItems[i], 1));
      }
      else{
        cart.find(x=>x.produto.id == bagItems[i].id)?.addProd();
      }
    }

    return cart;
  }

}
