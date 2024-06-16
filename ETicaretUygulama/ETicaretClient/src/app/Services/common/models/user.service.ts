import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { User } from '../../../Entities/user';
import { Create_User } from '../../../Contracts/Users/Create_User';
import { Observable, firstValueFrom, map } from 'rxjs';
import { User_Login } from '../../../Contracts/Users/User_Login';
import { AlertService } from '../../admin/alert.service';
import { Token_Response } from '../../../Contracts/token/Token_Response';
import { SpinnerService } from '../../admin/spinner/spinner.service';
import { SocialUser } from '@abacritt/angularx-social-login';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClientService:HttpClientService,private alertService:AlertService,private spinnerService:SpinnerService) { }

  create(user:User) : Observable<Create_User>{
    const res:Observable<Create_User | User> = this.httpClientService.post< User >({
      controller:"users"
    },user)
    return res.pipe(
      map((response:any)=>{
        if(response.success !== undefined && response.message!==undefined){
          return response as Create_User
        }else{
          throw new Error("Unexpected response type")
        }
      })
    )
  }
  
 
}
