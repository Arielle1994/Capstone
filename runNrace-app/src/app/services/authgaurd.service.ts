import { Injectable } from '@angular/core';
import { LoginService } from './login.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthgaurdService {

  constructor(private _loginService:LoginService, private router:Router) { } 


  canActivate(): boolean{
    if(!this._loginService.isAuthenticated()){
      this.router.navigate(["login"]);
      return false
    } else {
      return true;
    }
  }
}
