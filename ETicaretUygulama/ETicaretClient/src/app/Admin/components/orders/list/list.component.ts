import { Component, OnInit} from '@angular/core';
import { TableLazyLoadEvent, TableModule } from 'primeng/table';
import { List_Order } from '../../../../Contracts/order/List_Order';
import { OrderService } from '../../../../Services/common/models/order.service';
import { finalize } from 'rxjs';
import { SpinnerService } from '../../../../Services/admin/spinner/spinner.service';
import { AlertService } from '../../../../Services/admin/alert.service';
import { CurrencyPipe, DatePipe, NgIf } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { OrderDetailDialogComponent } from './order-detail-dialog/OrderDetailDialogComponent';
import { ShareService } from '../../../../Services/common/share/share.service';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [TableModule, CurrencyPipe,ButtonModule,DialogModule,
    OrderDetailDialogComponent, DatePipe,NgIf],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent implements OnInit {
  sendOrderId : string | null = null
  
  orders : List_Order[];

  totalOrderCount:number;
  
  page: number;

  size: number;

  visible:boolean = false;
  
  constructor(private orderService:OrderService,private spinnerService:SpinnerService, private alertService:AlertService,private shareService:ShareService){}
  
  ngOnInit(): void {
  }

  openDialogPanel(){
    this.visible=true;
  }

  getOrders(){
    this.spinnerService.showSpinner()
    this.orderService.getAllOrders(this.page,this.size).pipe(
      
      finalize(()=>{this.spinnerService.hideSpinner()})
    
    ).subscribe({
      next:res=>{
        this.orders = res.orders
        this.totalOrderCount = res.totalOrderCount
      },
      error:err=>{
        this.alertService.errorMessage(err)
      }
    })
  }
  
  lazyLoadPagination(event: TableLazyLoadEvent){
    this.page = event.first / event.rows
    this.size = event.rows
    this.getOrders();
  }
  
  showDetailOrder(orderId:string){
    this.shareService.setOrderId(orderId)
  }
}
