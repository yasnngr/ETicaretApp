import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { User } from '../../../Entities/user';
import { Create_User } from '../../../Contracts/Users/Create_User';
import { Observable, map } from 'rxjs';
import { AlertService } from '../../admin/alert.service';
import { SpinnerService } from '../../admin/spinner/spinner.service';
import { List_Users } from '../../../Contracts/Users/List_Users';

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

  updatePassword(userId:string,resetToken:string,password:string,confirmPassword:string):Observable<any>{
   return this.httpClientService.post({
      controller:"users",
      action: "update-password"
    },{userId:userId,
      resetToken:resetToken,
      password:password,
      confirmPassword:confirmPassword})
  }

  getAllUsers(page:number=0,size:number=5):Observable<List_Users>{
    return this.httpClientService.get<List_Users>({
      controller : "users",
      queryString : `page=${page}&size=${size}`
    })
  }

  assignRoleToUser(id : string, roles : string[]){
    return this.httpClientService.post({
      controller: "users",
      action : "assign-role-to-user"
    },{userId:id,roles:roles})
  }
  
  getRolesToUser(userId : string):Observable<{userRoles:string[]}>{
    return this.httpClientService.get<{userRoles:string[]}>({
      controller : "users",
      action : "get-roles-to-user"
    },userId)
  }
 
}
