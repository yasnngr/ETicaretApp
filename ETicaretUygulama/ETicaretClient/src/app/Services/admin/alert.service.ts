import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private messageService:MessageService){}

  successMessage(message){
    this.messageService.add({ severity: 'success', summary: 'Success', detail: message })
  }
  errorMessage(message){
    this.messageService.add({ severity: 'error', summary: 'Error', detail: message })
  }
  warnMessage(message){
    this.messageService.add({ severity: 'warn', summary: 'Warn', detail: message })
  }
  infoMessage(message){
    this.messageService.add({ severity: 'info', summary: 'Info', detail: message })
  }
}