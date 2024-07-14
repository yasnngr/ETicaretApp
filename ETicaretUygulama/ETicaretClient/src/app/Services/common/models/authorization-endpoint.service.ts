import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationEndpointService {

  constructor(private httpClientService:HttpClientService) { }

  assignRoleEndpoint(roles:string[], code:string, menu : string){
    return this.httpClientService.post({
      controller : "AuthorizationEndpoints"
    },{
      roles:roles,
      code:code,
      menu:menu
    })
  }

  getRolesToEndpoint(code : string, menu : string):Observable<string[]| any>{
    return this.httpClientService.post({
      controller : "AuthorizationEndpoints",
      action : "get-roles-to-endpoint"
    },{code:code,menu:menu})
  }
}
