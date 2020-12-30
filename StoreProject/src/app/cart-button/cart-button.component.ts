import { Component, Input, IterableDiffers, OnInit, SimpleChanges } from '@angular/core';
import { GlobalServices } from '../global-services.service';
import { Produto } from '../Models/produto.model';
import { ProdutoServiceService } from '../random-prods/produto-service.service';
import { prod } from '../random-prods/random-prods.component';

@Component({
  selector: 'app-cart-button',
  templateUrl: './cart-button.component.html',
  styleUrls: ['./cart-button.component.css', '../style/main.css']
})
export class CartButtonComponent implements OnInit {
  
  constructor(public globalsService: GlobalServices, private produtoService: ProdutoServiceService) { }
  
  ngOnInit(): void {
    // this.produtoService.getCartItems().subscribe(result => this.items = result);
    
    this.produtoService.getBagItems().subscribe((data)=>{
      this.produtoList = data;
    });

  }

  items: prod[] = [];

  //Final from Api
  produtoList: Produto[] = [];
  // bag: Bag[] = [];

  get selectedTextNumber(): number {
    var size: number = 0;

    this.produtoService.getBagItems().subscribe(x=> this.produtoList = x);
    this.produtoService.getBagItemCount().subscribe(x=> size = x);

    return size;
  }

  get hidden(): boolean{
    return this.produtoList.length > 0 ? false: true;
  }

}
