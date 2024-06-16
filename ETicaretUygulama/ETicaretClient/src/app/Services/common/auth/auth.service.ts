import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { AlertService } from '../../admin/alert.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private jwtHelper: JwtHelperService, private router: Router, private alertService: AlertService) { }
  token: string;
  expired: boolean;

  private getTokenFromLocalStorage(): string {
    return typeof localStorage !== 'undefined' ? localStorage.getItem('accessToken') : null
  }

  identityCheck() {
    this.token = this.getTokenFromLocalStorage()
    try {
      const expired = this.jwtHelper.isTokenExpired(this.token)
    } catch {
      this.expired = true
    }
    _isAutenticated = this.token != null && !this.expired;
  }

  logout() {
    localStorage.removeItem("accessToken")
    this.identityCheck();
    this.alertService.infoMessage("Logout")
    this.router.navigate(["/"])
  }

  get isAutenticated(): boolean {
    return _isAutenticated
  }
}

export let _isAutenticated: boolean;
