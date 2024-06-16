import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  constructor(private ngxSpinner:NgxSpinnerService) { }

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
