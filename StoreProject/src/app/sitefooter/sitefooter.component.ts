import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-sitefooter',
  templateUrl: './sitefooter.component.html',
  styleUrls: ['./sitefooter.component.css'],
})

export class SitefooterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }


  thisYear = new Date().getFullYear();
  storeName = "Store Project";
  
  openPaymentModal(){
    Swal.fire({
      title: '<span>FORMAS DE PAGAMENTO</span>',
      html: '<mat-divider></mat-divider> <span>O pagamento pode ser realizado por cartão de crédito ou transferência bancária.<br>' + 
      'As bandeiras aceitas são: Visa, Mastercard. Apenas cartões de crédito emitidos no Brasil são aceitos.<br>' + 
      'Ao realizar um pedido online, o endereço de cobrança deve estar alinhado com o endereço do seu cartão de crédito. Todas as transações realizadas no site são seguras.<br>',
      confirmButtonText: 'Ok',
      confirmButtonColor: 'darkslateblue',
      showCloseButton: true,
      width: 1000,
    });
  }

  goToLink(url: string){
    window.open(url, "_blank");
  }


}
