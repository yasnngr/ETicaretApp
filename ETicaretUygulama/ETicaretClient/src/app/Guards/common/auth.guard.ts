import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AlertService } from '../../Services/admin/alert.service';
import { AuthService } from '../../Services/common/auth/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const router:Router = inject(Router)
  const alertService:AlertService=inject(AlertService)
  const authService:AuthService = inject(AuthService)

  if(!authService.isAuthenticated){
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
  