import { Injectable } from '@angular/core';
import { User_Login } from '../../../Contracts/Users/User_Login';
import { Token_Response } from '../../../Contracts/token/Token_Response';
import { SocialUser } from '@abacritt/angularx-social-login';
import { HttpClientService } from '../http-client.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  constructor(private httpClientService: HttpClientService) { }

  login(userInfo: User_Login) {
    return this.httpClientService.post<any | Token_Response>({
      controller: "auth",
      action: "login"
    }, userInfo)
  }

  refleshTokenLogin(refleshToken:string){
     this.httpClientService.post<Token_Response|any>({
      action:"refleshTokenLogin",
      controller:"auth"
    },{refleshToken:refleshToken}).subscribe({
      next:(res)=>{
        if(res){
          localStorage.setItem("accessToken", res.token.accessToken)
          localStorage.setItem("refleshToken", res.token.refleshToken)
        }
      }
    })
  }

  googleLogin(user: SocialUser): Observable<Token_Response | any> {
    return this.httpClientService.post<SocialUser | Token_Response>({
      controller: "auth",
      action: "google-login"

    }, user)
  }
}
