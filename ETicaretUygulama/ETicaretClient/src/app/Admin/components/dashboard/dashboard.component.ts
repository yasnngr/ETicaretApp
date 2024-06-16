import { Component, OnInit, Output } from '@angular/core';
import { SignalRService } from '../../../Services/common/signalr.service';
import { ReceiveFunc } from '../../../Constants/receive-func';
import { HubUrls } from '../../../Constants/Hubs-urls';
import { AlertService } from '../../../Services/admin/alert.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {

constructor(private signalRService:SignalRService,private alertService:AlertService) {
  signalRService.start(HubUrls.ProductHub)
}
  ngOnInit(): void {
    this.signalRService.on(ReceiveFunc.ProductAddedMessageReceiveFunc,message=>{
      this.alertService.infoMessage(message)
    });
  }

}
