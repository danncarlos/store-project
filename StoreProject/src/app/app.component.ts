import { Component, OnInit } from '@angular/core';
import { Inject }  from '@angular/core';
import { DOCUMENT } from '@angular/common'; 
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [
    './app.component.css',
    './style/main.css'
  ]
})
export class AppComponent implements OnInit {
  
  constructor(private router: Router, fb: FormBuilder) {
    this.options = fb.group({
      bottom: 0,
      fixed: true,
      top: 0
    });
  }

  title = 'Store Project';
  links: any[] = [
    { linkTxt: 'Home', navUrl: '/home', icon: 'home' },
    { linkTxt: 'Meus Pedidos', navUrl: '/minhas-compras', icon: 'shopping_bag' },
  ];

  ngOnInit(): void { 
    this.router.navigate(['/home']);
  }

  showFiller = false;
  options: FormGroup;

  navigateTo(url: string){
    this.router.navigate([url]);
  }
  
  logged(){
    
    let _user = localStorage.getItem('user');
    if(_user == null || _user == "") return false;
    else return true;
  }

  get userName(): string {
    let _user = localStorage.getItem('user');
    
    let usuario: any;
    if(_user != null || _user != "") usuario = JSON.parse(_user || "");

    return usuario.userName;
  }

}
