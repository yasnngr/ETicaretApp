import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AlertService } from '../../Services/admin/alert.service';
import { _isAutenticated } from '../../Services/common/auth/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const router:Router = inject(Router)
  const alertService:AlertService=inject(AlertService)

  if(!_isAutenticated){
    router.navigate(["/login"],{queryParams:{returnUrl:state.url}})
    alertService.warnMessage("Unauthorised access")
  }
  
  return true;
};
  // const token: string = getTokenFunck();
  // let expired:boolean;
  // try{
  //   expired = jwtHelper.isTokenExpired(token)
  // }catch{
  //   expired=true
  // }
  