import { Component, OnInit } from '@angular/core';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { TableModule } from 'primeng/table';
import { List_Basket_Item } from '../../../../Contracts/basket/list_basket_item';
import { BasketService } from '../../../../Services/common/models/basket.service';
import { finalize } from 'rxjs';
import { SpinnerService } from '../../../../Services/admin/spinner/spinner.service';
import { AlertService } from '../../../../Services/admin/alert.service';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-dropdownbaskets',
  standalone: true,
  imports: [OverlayPanelModule,TableModule,CurrencyPipe],
  templateUrl: './dropdownbaskets.component.html',
  styleUrl: './dropdownbaskets.component.scss'
})
export class DropdownbasketsComponent implements OnInit{
  basketItems : List_Basket_Item[]

  constructor(private basketService:BasketService, private spinnerService:SpinnerService,private alertService:AlertService){}
  
  ngOnInit(): void {
    this.getBasketItem()
  }

  getBasketItem(){
    this.spinnerService.showSpinner()
    this.basketService.get().pipe(
      finalize(()=>{this.spinnerService.hideSpinner()})
    ).subscribe({
      next:res=>{
        this.basketItems=res
      },
      error:err=>{
        this.alertService.errorMessage(err)
      }
    })
  }
  getProductImageSrc(image?:List_Basket_Item):string{
    if (image.productImageFile) {
      return `https://localhost:7243/${image.productImageFile.path}`;
    }else{
      return `assets/default-product-image.webp`;
    } 
}
}
