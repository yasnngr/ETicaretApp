import { Component } from '@angular/core';
import { ListComponent } from './list/list.component';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [ListComponent],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent {

}
