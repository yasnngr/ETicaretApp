import { Component } from '@angular/core';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-base',
  standalone: true,
  imports: [NgxSpinnerModule],
  templateUrl: './base.component.html',
  styleUrl: './base.component.scss',
})
export class BaseComponent {
  
  constructor(private ngxSpinner:NgxSpinnerService){ }

  showSpinner(){
    this.ngxSpinner.show()
    setTimeout(() => {
      this.ngxSpinner.hide()
    }, 3000);
  }

  hideSpinner(){
    this.ngxSpinner.hide()
  }
}

