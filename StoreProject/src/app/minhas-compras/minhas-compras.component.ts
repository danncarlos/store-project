import { Component, OnInit } from '@angular/core';
import { CartProduts } from '../cart-page/cart-page.component';
import { Compras } from '../Models/compras.model';
import { HistoricoCompras } from '../Models/historicocompras.model';
import { MinhasComprasModel } from '../Models/minhasCompras';
import { ProdutoServiceService } from '../random-prods/produto-service.service';
import { prod } from '../random-prods/random-prods.component';
import { UsuarioService } from '../usuario.service';
import { ComprasService } from './compras.service';

@Component({
  selector: 'app-minhas-compras',
  templateUrl: './minhas-compras.component.html',
  styleUrls: ['./minhas-compras.component.css']
})
export class MinhasComprasComponent implements OnInit {

  constructor(private produtoService: ProdutoServiceService, private minhasComprasServices: ComprasService, private userService: UsuarioService) { }

  ngOnInit(): void {

    // this.produtoService.getCartItems().subscribe(result => this.items = result);
    // if(this.items.length > 1)
    //   this.populate();

    var _id = this.userService.getUserId();

    this.minhasComprasServices.getAllHistory(_id || "").subscribe((x)=> {    
      if(x != null){
        this.comprasList = x;
        console.log('lista', this.comprasList);
      } 
    });

    if(this.comprasList.length > 1) this.populate();

  }

  items: prod[] = [];
  compras: MinhasComprasModel[] = [];
  panelOpenState = false;


  //From Api
  comprasList: HistoricoCompras[] = [];


  populate(){
    var cp1 = new MinhasComprasModel();
    cp1.id = '1';
    cp1.produtos = [];
    cp1.produtos.push(new CartProduts(this.items[0], 1));
    // cp1.total = cp1.produtos.map(x=>x.produto.prodPreco) * cp1.produtos.map(x=>x.qtd);
    cp1.total = 12;
    this.compras.push(cp1);

    var cp2 = new MinhasComprasModel();
    cp2.id = '2';
    cp2.produtos = [];
    cp2.produtos.push(new CartProduts(this.items[0], 1));
    cp2.produtos.push(new CartProduts(this.items[1], 2));
    // cp1.total = cp1.produtos.map(x=>x.produto.prodPreco) * cp1.produtos.map(x=>x.qtd);
    cp2.total = 124;

    this.compras.push(cp2);
  }

}
