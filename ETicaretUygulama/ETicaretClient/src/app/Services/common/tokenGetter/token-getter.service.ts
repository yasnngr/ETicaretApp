import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenGetterService {

  constructor() { }

  tokenGetter(){
    return localStorage.getItem("accessToken")
  }
}
