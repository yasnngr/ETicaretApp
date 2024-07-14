import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { Create_Order } from '../../../Contracts/order/Create_Order';
import { List_Order } from '../../../Contracts/order/List_Order';
import { Observable } from 'rxjs';
import { Single_Order } from '../../../Contracts/order/Single_Order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private httpClientService:HttpClientService) { }

create(order:Create_Order){
  this.httpClientService.post({
    controller:"order"
  },order).subscribe();
}

getAllOrders(page:number=0,size:number = 5):Observable<{totalOrderCount:number; orders:List_Order[]}>{
  return this.httpClientService.get({
    controller:"order",
    queryString:`page=${page}&size=${size}`
  });
}

getOrderById(id : string):Observable<Single_Order>{
  return this.httpClientService.get({
    controller:"order"
  },id)
}

completeOrder(id:string){
return this.httpClientService.get({
  controller:"order",
  action:"complete-order"
},id)

}


}

