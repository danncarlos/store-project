import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ProdutoServiceService } from '../random-prods/produto-service.service';
import { UsuarioService } from '../usuario.service';

const acess = "acesso";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [
    './login.component.css',
    '../style/main.css'
  ]
})

export class LoginComponent implements OnInit {

  @Input() metodo!: string;
  
  constructor(private formBuilder: FormBuilder, private userService: UsuarioService, private router: Router, private produtoService: ProdutoServiceService) { }

  ngOnInit(): void {
    this.createForm(new Login());

    if(this.metodo == acess) this.loginBtnTxt = "Login";
    else this.loginBtnTxt = "Concluir Compra";

  }

  loginBtnTxt!: string;


  loginForm!: FormGroup;
  loginErro: boolean = false;

  createForm(login: Login) {
    this.loginForm = new FormGroup({
      email: new FormControl(login.email, Validators.required),
      name: new FormControl(login.nome, Validators.required),
      phone: new FormControl(login.tel, Validators.required),
    });
  }


  login(){

    if(this.loginForm.controls.email.value && this.loginForm.controls.name.value){
      //Login Code
      let data: Login = new Login();
      data.email = this.loginForm.controls.email.value;
      data.nome = this.loginForm.controls.name.value;
      data.tel = this.loginForm.controls.phone.value;

      if(this.metodo == acess){
        this.userService.login(data).subscribe(x => {
          this.userService.store(x.toString());
          // window.location.reload();
          this.reloadCurrentRoute();

        });
      }
      else{

        this.userService.login(data).subscribe(x => {
          debugger;
          this.userService.store(x.toString());
          this.produtoService.makePurchase(x.toString());
        }, 
        () => {}, 
        ()=>{
          console.log('complete');
          this.produtoService.clearBag();
          this.router.navigate(['/minhas-compras']);
        });
        // if(this.userService.isLogged()){
        //   var id = this.userService.getUserId();
        //   this.produtoService.makePurchase(id || "");

        //   this.produtoService.clearBag();
        //   this.router.navigate(['/minhas-compras']);
        // }
        // else{

        //   this.userService.login(data).subscribe(x => {
        //     debugger;
        //     this.userService.store(x.toString());
        //     this.produtoService.makePurchase(x.toString());
        //   }, 
        //   () => {}, 
        //   ()=>{
        //     console.log('complete');
        //     this.produtoService.clearBag();
        //     this.router.navigate(['/minhas-compras']);
        //   });
        // }
      }
     

      // this.produtoService.clearBag();
      // this.router.navigate(['/minhas-compras']);
    }

  }

  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate([currentUrl]);
    });
}

}

export class Login{
  email!: String;
  nome!: String;
  tel!: string;
}