import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShareService {
  private orderIdSubject = new Subject<string>();

  // Observable stream
  orderId$ = this.orderIdSubject.asObservable();

  // Service command
  setOrderId(orderId: string) {
    this.orderIdSubject.next(orderId);
  }
}
