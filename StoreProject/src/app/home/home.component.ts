import { Component, OnInit } from '@angular/core';
import { ProdutoServiceService } from '../random-prods/produto-service.service';
import { prod } from '../random-prods/random-prods.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: [
    './home.component.css',
    '../style/main.css'
  ]
})
export class HomeComponent implements OnInit {

  constructor(private produtoService: ProdutoServiceService) { }

  ngOnInit(): void {
    // this.produtoService.getCartItems().subscribe(result => this.items = result);
  }

  items: prod[] = [];

}
