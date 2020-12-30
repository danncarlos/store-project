import { Injectable } from '@angular/core';
import { UsuarioApi } from './api/user.api';
import { Login } from './login/login.component';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private userApi: UsuarioApi) { }

  login(loginModel: Login){
    return this.userApi.userLogin(loginModel);
  }

  store(id: string) {
    localStorage.setItem("userId", id);
  }

  getUserId(){
    let userId = localStorage.getItem("userId")?.toString();
    return userId;
  }

  isLogged(){
    let user = localStorage.getItem("userId");

    return user != null ? true: false;
  }

  static logout(){
      localStorage.removeItem('userId');
  }


}
