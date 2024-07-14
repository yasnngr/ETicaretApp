import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, finalize, of } from 'rxjs';
import { AlertService } from '../admin/alert.service';
import { SpinnerService } from '../admin/spinner/spinner.service';
import { UserAuthService } from './models/user-auth.service';
import { Router } from '@angular/router';
import { AuthService } from './auth/auth.service';
import { getRefleshTokenFunck, localStorageClear } from './tokenGetter/tokenFunc';

@Injectable({
  providedIn: 'root'
})
export class HttpErrorHandlerInterceptorService implements HttpInterceptor{

  constructor(private alertService:AlertService,
              private spinnerService:SpinnerService,
              private userAuthService:UserAuthService,
              private router:Router,
              private authService:AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    
    
    return next.handle(req).pipe(
      finalize(()=>{
        this.spinnerService.hideSpinner();
      }),
      catchError(error=>{
      switch(error.status){
        case HttpStatusCode.Unauthorized:
          let url = this.router.url
          if(url=="/baskets"){
            this.alertService.warnMessage("Login to add products to the basket.");
          }else{
            this.alertService.warnMessage("You do not have permission to perform this action.");
          }
            this.userAuthService.refleshTokenLogin(getRefleshTokenFunck())
            break;

        case HttpStatusCode.InternalServerError:
          this.alertService.warnMessage("Sunucuya erişilemiyor.");
          break;
        case HttpStatusCode.BadRequest:
          this.alertService.warnMessage("Geçersiz istek yapıldı.");
          break;
        case HttpStatusCode.NotFound:
          this.alertService.warnMessage("Sayfa bulunamadı.");
          break;
        default:
          this.alertService.warnMessage("Beklenmeyen bir hata ile karşılaşıldı.");
          break;
      }
      return of(error)
    }))
  }
}
