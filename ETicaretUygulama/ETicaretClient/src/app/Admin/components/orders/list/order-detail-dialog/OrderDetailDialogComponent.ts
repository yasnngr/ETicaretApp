import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { OrderService } from '../../../../../Services/common/models/order.service';
import { finalize } from 'rxjs';
import { SpinnerService } from '../../../../../Services/admin/spinner/spinner.service';
import { Single_Order } from '../../../../../Contracts/order/Single_Order';
import { AlertService } from '../../../../../Services/admin/alert.service';
import { CurrencyPipe } from '@angular/common';
import { ConfirmationService } from 'primeng/api';


@Component({
  selector: 'app-order-detail-dialog',
  standalone: true,
  imports: [ButtonModule, DialogModule, TableModule,CurrencyPipe],
  templateUrl: './order-detail-dialog.component.html',
  styleUrl: './order-detail-dialog.component.scss'
})
export class OrderDetailDialogComponent {

  dialogVisible: boolean = false;

  singleOrder: Single_Order;

  totalPrice:number;

  constructor(private orderService: OrderService, private spinnerService: SpinnerService,private alertService:AlertService,private confirmationService:ConfirmationService) {
  }

  openDialogPanel(id : string) {
    this.dialogVisible = true;
    this.orderService.getOrderById(id).pipe(
      finalize(()=>this.spinnerService.hideSpinner())
    ).subscribe({
      next:orderById=>{
        this.singleOrder = orderById
        this.totalPriceCount()
      },
      error:err=>{
        this.alertService.errorMessage(err)
      }
    })
}
totalPriceCount(){
  this.totalPrice = this.singleOrder.basketItems.map((basketItem,index)=>basketItem.price *basketItem.quantity).reduce((price,current)=>price + current);
}
completeOrder(event:Event ,id:string){
  this.confirmationService.confirm({
    target: event.target as EventTarget,
    message: 'Are you sure that you want to complete to order?',
    header: 'Confirmation',
    icon: 'pi pi-exclamation-triangle',
    acceptButtonStyleClass:"p-button-success p-button-text",
    rejectButtonStyleClass:"p-button-text p-button-text",
    accept: () => {
      this.spinnerService.showSpinner();
      this.orderService.completeOrder(id).pipe(
        finalize(()=>{
          this.spinnerService.hideSpinner();
        })
      ).subscribe({
        next:res=>{
          this.alertService.successMessage("The order has been successfully completed.");
        },
        error:err=>{
          this.alertService.errorMessage(err)
        }
      })
    },
    reject: () => {
    }
  })
  
}


}
