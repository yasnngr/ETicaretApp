import { Injectable } from '@angular/core';
import { User_Login } from '../../../Contracts/Users/User_Login';
import { Token_Response } from '../../../Contracts/token/Token_Response';
import { SocialUser } from '@abacritt/angularx-social-login';
import { HttpClientService } from '../http-client.service';
import { finalize, Observable } from 'rxjs';
import { SpinnerService } from '../../admin/spinner/spinner.service';
import { AlertService } from '../../admin/alert.service';
import { localStorageClear } from '../tokenGetter/tokenFunc';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  constructor(private httpClientService: HttpClientService,private spinnerService:SpinnerService,private alertService:AlertService) { }

  login(userInfo: User_Login) {
    return this.httpClientService.post<any | Token_Response>({
      controller: "auth",
      action: "login"
    }, userInfo)
  }

  // refleshTokenLogin(refleshToken:string){
  //    this.httpClientService.post<Token_Response|any>({
  //     action:"refleshTokenLogin",
  //     controller:"auth"
  //   },{refleshToken:refleshToken}).subscribe({
  //     next:(res)=>{
  //       console.log(res)
  //         localStorage.setItem("accessToken", res.token.accessToken)
  //         localStorage.setItem("refleshToken", res.token.refleshToken)
  //     },
  //     error:err=>{
  //       localStorageClear();
  //     }
  //   })
  // }
  refleshTokenLogin(refleshToken:string){
    this.httpClientService.post<Token_Response|any>({
     action:"refleshTokenLogin",
     controller:"auth"
   },{refleshToken:refleshToken}).subscribe({
     next:(res)=>{
       console.log(res)
         localStorage.setItem("accessToken", res.token.accessToken)
         localStorage.setItem("refleshToken", res.token.refleshToken)
     },
     error:err=>{
      console.log(err)
       localStorageClear();
     }
   })
 }

  googleLogin(user: SocialUser): Observable<Token_Response | any> {
    return this.httpClientService.post<SocialUser | Token_Response>({
      controller: "auth",
      action: "google-login"

    }, user)
  }

  passwordReset(email:string){
    this.spinnerService.showSpinner();
    this.httpClientService.post({
      controller:"auth",
      action:"password-reset"
    },email).pipe(
      finalize(()=>this.spinnerService.hideSpinner())
    ).subscribe({
      next:res=>{
        this.alertService.successMessage("The password reset email has been successfully sent.")
      },
      error:err=>{
        this.alertService.errorMessage(err)
      }
    });
  }

  verifyResetToken(resetToken:string , userId : string):Observable<boolean | any>{
    return this.httpClientService.post({
      controller : "auth",
      action : "verify-reset-token"
    },{resetToken : resetToken, userId : userId})
  }
}
