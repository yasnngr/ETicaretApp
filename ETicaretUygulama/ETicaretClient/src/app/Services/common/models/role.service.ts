import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { Observable } from 'rxjs';
import { List_Roles } from '../../../Contracts/role/List_Roles';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private httpClientService:HttpClientService) { }

  getRoles(page:number=0, size:number=5):Observable<{totalCount : number,datas:List_Roles[]}>{
    return this.httpClientService.get({
      controller : "roles",
      queryString: `page=${page}&size=${size}`
    })
  }

  createRole(name:string):Observable<{succeeded:boolean}|any>{
    return this.httpClientService.post({
      controller:"roles"
    },name)
  }

  deleteRole(id : string){
    return this.httpClientService.delete({
      controller : "roles"
    },id)
  }
}
