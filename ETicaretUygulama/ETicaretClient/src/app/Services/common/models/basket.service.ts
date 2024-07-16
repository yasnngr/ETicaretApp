import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { BehaviorSubject, catchError, delay, finalize, Observable, shareReplay, tap } from 'rxjs';
import { List_Basket_Item } from '../../../Contracts/basket/list_basket_item';
import { Create_Basket_Item } from '../../../Contracts/basket/create_basket_item';
import { AlertService } from '../../admin/alert.service';
import { Update_Basket_Item } from '../../../Contracts/basket/update_basket_item';
import { SpinnerService } from '../../admin/spinner/spinner.service';

@Injectable({
  providedIn: 'root'
})
export class BasketService {
  
  private basketItems$: Observable<List_Basket_Item[]>;
  private basketItemCountSubject = new BehaviorSubject<number>(0);
  basketItemCountSubject$ = this.basketItemCountSubject.asObservable();

  constructor(private httpClientService:HttpClientService,private alertService:AlertService,private spinnerService:SpinnerService) {
   this.initGetBasketItems();
   }

  get():Observable<List_Basket_Item[]>{
    return this.basketItems$;
  }

  private initGetBasketItems(){
    this.basketItems$ = this.httpClientService.get({
      controller:"basket"
    }).pipe(
      tap(()=>this.spinnerService.showSpinner()),
      tap((items:List_Basket_Item[])=>{
        this.updateBasketItemCount(items.length)
      }),
      catchError(err=>{
        this.alertService.errorMessage(err)
        throw err;
      }),
      shareReplay(1),
      finalize(()=>this.spinnerService.hideSpinner()),
    )
  }

    add(basketItem:Create_Basket_Item):Observable<any>{
      return this.httpClientService.post({
        controller:"basket"
      },basketItem).pipe(
        tap(() => {
          this.alertService.successMessage("The product has been added to the basket");
          this.refleshBasket();
        }),
        catchError(err => {
          this.alertService.errorMessage(err);
          throw err;
        })
      );
    }

    updateQuantity(basketItem:Update_Basket_Item){
     return this.httpClientService.put({
        controller:"basket"
      },basketItem).pipe(
        tap(()=>{
          this.spinnerService.showSpinner();
          this.refleshBasket()
        }),
        finalize(()=>{
          this.spinnerService.hideSpinner();
        }),
        catchError(err=>{
          this.alertService.errorMessage(err)
          throw err;
        })
      )
    }

    remove(basketItemId:string){
      return this.httpClientService.delete({
        controller:"basket"
      },basketItemId).pipe(
        tap(()=>this.refleshBasket())
      )
    }

    refleshBasket(){
      this.initGetBasketItems();
      this.basketItems$.subscribe();
    }

    private updateBasketItemCount(count: number) {
      this.basketItemCountSubject.next(count);
    }
}
