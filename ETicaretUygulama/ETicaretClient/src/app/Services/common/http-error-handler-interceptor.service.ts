import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { AlertService } from '../admin/alert.service';
import { SpinnerService } from '../admin/spinner/spinner.service';
import { UserAuthService } from './models/user-auth.service';

@Injectable({
  providedIn: 'root'
})
export class HttpErrorHandlerInterceptorService implements HttpInterceptor{

  constructor(private alertService:AlertService,private spinnerService:SpinnerService,private userAuthService:UserAuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(catchError(error=>{
      switch(error.status){
        case HttpStatusCode.Unauthorized:
          this.spinnerService.hideSpinner();
          this.alertService.warnMessage("Bu işlemi yapmaya yetkiniz yok.");
          this.userAuthService.refleshTokenLogin(localStorage.getItem("refleshToken"))
          break;
        case HttpStatusCode.InternalServerError:
          this.spinnerService.hideSpinner();
          this.alertService.warnMessage("Sunucuya erişilemiyor.");
          break;
        case HttpStatusCode.BadRequest:
          this.spinnerService.hideSpinner();
          this.alertService.warnMessage("Geçersiz istek yapıldı.");
          break;
        case HttpStatusCode.NotFound:
          this.spinnerService.hideSpinner();
          this.alertService.warnMessage("Sayfa bulunamadı.");
          break;
        default:
          this.spinnerService.hideSpinner();
          this.alertService.warnMessage("Beklenmeyen bir hata ile karşılaşıldı.");
          break;
      }
      return of(error)
    }))
  }
}
