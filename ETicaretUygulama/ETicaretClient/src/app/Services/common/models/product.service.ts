import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { Create_Product } from '../../../Contracts/Create_Product';
import { HttpErrorResponse } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertService } from '../../admin/alert.service';
import { Observable, firstValueFrom, lastValueFrom } from 'rxjs';
import { Read_Product } from '../../../Contracts/Read_Product';
import { List_Product_Images } from '../../../Contracts/List_Product_Images';
import { List_Product } from '../../../Contracts/List_Product';


@Injectable({
  providedIn: 'root',
})
export class ProductService {

  constructor
    (
      private httpClientService: HttpClientService,
      private ngxSpinner: NgxSpinnerService,
      private alertService: AlertService) { }

  create(product: Create_Product) {
    this.httpClientService.post({
      controller: "products"
    }, product).subscribe({
      next: () => {
        this.alertService.successMessage("Product added database")
        this.ngxSpinner.hide()
      },
      error: (err: HttpErrorResponse) => {
        this.ngxSpinner.hide()
        const _error: { key: string, value: Array<string> }[] = err.error
        for (let key in _error) {
          let value = _error[key]
          this.alertService.errorMessage(value)
        }
      }
    })
  }

  read(page: number = 0, size: number = 5): Observable<Read_Product> {
    return this.httpClientService.get<Read_Product>({
      controller: "products",
      queryString: `page=${page}&size=${size}`
    });
  }

  delete(id: string): Observable<any> {
    return this.httpClientService.delete<any>({
      controller: "products"
    }, id)
  }

  readImages(id: string): Observable<List_Product_Images[]> {
    return this.httpClientService.get<List_Product_Images[]>({
      action: "getproductimage",
      controller: "products"
    }, id)
  }
  deleteImage(productId: string, imageId: string): Observable<any> {
    return this.httpClientService.delete<any>({
      action: "deleteproductimage",
      controller: "products",
      queryString: `imageId=${imageId}`
    }, productId)
  }

  changeShowcaseImage(imageId:string,productId:string){
   this.httpClientService.get({
      controller:"products",
      action:"ChangeShowcaseImage",
      queryString:`imageId=${imageId}&productId=${productId}`
    }).subscribe(res=>{
      console.log(res)
    });
  }

}
// async read(successCallBack?: () => void, errorCallBack?: (errorMessage: string) => void): Promise<List_Product[]> {
//   let responseModel:List_Product[]=null;
//   const promiseData = this.httpClientService.get<List_Product[]>({
//     controller: "products"
//   });
//    await lastValueFrom<List_Product[]>(promiseData)
//       .then(data => {
//         responseModel=data;
//         successCallBack
//       })
//       .catch((errorResponse: HttpErrorResponse) => errorCallBack(errorResponse.message))
//   return promiseData;
// }


// async delete(id:string){
//   const deleteObservable: Observable<any>= this.httpClientService.delete<any>({
//     controller:"products"
//   },id)
//   await firstValueFrom(deleteObservable)
// }
// async readAsync(page:number=0, size : number =5):Promise<Read_Product>{
//   const observable= this.httpClientService.get<{totalProductCount:number; products:List_Product[]}>({
//     controller:"products",
//     queryString : `page=${page}&size=${size}`
//   })
//  return await lastValueFrom(observable)
// }