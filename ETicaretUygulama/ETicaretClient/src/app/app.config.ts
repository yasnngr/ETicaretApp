import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, provideHttpClient, withFetch, withInterceptorsFromDi } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { ConfirmationService, MessageService } from 'primeng/api';
import { JwtModule } from '@auth0/angular-jwt';
import { getTokenFunck } from './Services/common/tokenGetter/getTokenFunc';
import { GoogleLoginProvider, SocialAuthServiceConfig, SocialLoginModule } from '@abacritt/angularx-social-login';
import { HttpErrorHandlerInterceptorService } from './Services/common/http-error-handler-interceptor.service';

export const appConfig: ApplicationConfig = {
  providers: 
  [
    provideRouter(routes), 
    provideClientHydration(),
    provideAnimationsAsync(),
    provideAnimations(),
    provideHttpClient(withFetch(),withInterceptorsFromDi()),
    provideToastr(),
    {provide:"baseUrl",useValue:"https://localhost:7243/api",multi:true},
    importProvidersFrom(
      JwtModule.forRoot({
        config:{
          tokenGetter:getTokenFunck,
          allowedDomains:["localhost:7243"]
        }
      })
    ),
    {provide: "SocialAuthServiceConfig",
    useValue: {
      autoLogin: false,
      providers: [
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider("344736073278-r96kjq5v0m1rqk004inb5ii1nkn60t1g.apps.googleusercontent.com")
        }
      ],
      onError: err => console.log(err)
    } as SocialAuthServiceConfig},
    {provide:HTTP_INTERCEPTORS,useClass:HttpErrorHandlerInterceptorService, multi:true},
    MessageService,
    ConfirmationService,
    SocialLoginModule
  ]
};