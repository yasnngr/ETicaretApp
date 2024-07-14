import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { Observable } from 'rxjs';
import { List_Basket_Item } from '../../../Contracts/basket/list_basket_item';
import { Create_Basket_Item } from '../../../Contracts/basket/create_basket_item';
import { AlertService } from '../../admin/alert.service';
import { Update_Basket_Item } from '../../../Contracts/basket/update_basket_item';
import { SpinnerService } from '../../admin/spinner/spinner.service';

@Injectable({
  providedIn: 'root'
})
export class BasketService {

  constructor(private httpClientService:HttpClientService,private alertService:AlertService,private spinnerService:SpinnerService) { }

    get():Observable<List_Basket_Item[]>{
     return this.httpClientService.get({
        controller:"basket"
      })
    }
    
    add(basketItem:Create_Basket_Item):void{
      this.httpClientService.post({
        controller:"basket"
      },basketItem).subscribe({
        next:res=>{
          this.alertService.successMessage("The product has been added to the basket")
          console.log(res)
        },
        error:err=>{
          this.alertService.errorMessage(err)
        }
      })
    }

    updateQuantity(basketItem:Update_Basket_Item){
     return this.httpClientService.put({
        controller:"basket"
      },basketItem)
    }

    remove(basketItemId:string){
      return this.httpClientService.delete({
        controller:"basket"
      },basketItemId)
    }
}
