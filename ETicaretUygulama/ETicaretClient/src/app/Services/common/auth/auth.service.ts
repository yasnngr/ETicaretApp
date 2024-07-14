import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { AlertService } from '../../admin/alert.service';
import { getRefleshTokenFunck, getTokenFunck, localStorageClear } from '../tokenGetter/tokenFunc';
import { BehaviorSubject } from 'rxjs';
import { UserAuthService } from '../models/user-auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private jwtHelper: JwtHelperService, private router: Router, private alertService: AlertService,private userAuthService:UserAuthService) { }
  
  // token: string;
  // expired: boolean;
  // private _isAutenticated : boolean;

  refleshToken : string =null;
  token: string = null;
  expired: boolean = false;
 
  private getTokenFromLocalStorage(): string {
    return typeof localStorage !== 'undefined' ? localStorage.getItem('accessToken') : null
  }

  // identityCheck() {
  //   this.token = this.getTokenFromLocalStorage()
  //   try {
  //     this.expired = this.jwtHelper.isTokenExpired(this.token)
  //   } catch {
  //     this.expired = true
  //   }
  //   this._isAutenticated = this.token != null && !this.expired;
    
  // }
  identityCheck() {
    this.refleshToken = getRefleshTokenFunck();
    this.token = this.getTokenFromLocalStorage();
    try {
      this.expired = this.jwtHelper.isTokenExpired(this.token);
    } catch {
      this.expired = true;
    }
  }

  logout() {
    localStorageClear();
    this.identityCheck();
    this.alertService.infoMessage("Logout")
    this.router.navigate(["/"])
  }

  // get isAutenticated(): boolean {
  //   return this._isAutenticated
  // }
   get isAuthenticated(): boolean {
    return this.token != null && !this.expired;
  }
}


