import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { Observable } from 'rxjs';
import { Menu } from '../../../Contracts/Application-Configurations/Menu';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  constructor(private httpClientSerivice:HttpClientService) { }

  getAuthorizeDefinitionEndpoints():Observable<Menu[]>{
    return this.httpClientSerivice.get<Menu[]>({
      controller : "ApplicationServices"
    })
  }
}
