import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { SplitButtonModule } from 'primeng/splitbutton';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { AuthService } from './Services/common/auth/auth.service';
import { NgFor, NgIf } from '@angular/common';
import { BadgeModule } from 'primeng/badge';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { ComponentType, DynamicLoadComponentService } from './Services/common/dynamic-load-component.service';
import { DynamicLoadComponentDirective } from './directives/common/dynamic-load-component.directive';
import { BasketService } from './Services/common/models/basket.service';
import { MenuItem } from 'primeng/api';
import { MenuModule } from 'primeng/menu';
import { localStorageClear } from './Services/common/tokenGetter/tokenFunc';
import { Subscription } from 'rxjs';
import { count } from 'console';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, InputTextModule, ButtonModule,
    ToastModule, RouterOutlet, RouterLink, NgxSpinnerModule,
    ConfirmDialogModule, SplitButtonModule, ConfirmPopupModule, NgIf,
    BadgeModule,OverlayPanelModule,DynamicLoadComponentDirective, MenuModule, NgFor
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent  implements OnInit,OnDestroy{
  menuItems: MenuItem[];
  basketItemLength:string;
  private basketSubscription : Subscription;

  @ViewChild(DynamicLoadComponentDirective,{static:true}) dynamicLoadComponentDirective:DynamicLoadComponentDirective


  constructor(public authService: AuthService, private router: Router,
    private dynamicLoadComponentService:DynamicLoadComponentService,
    private basketService:BasketService) {
    authService.identityCheck()
  }
 
  ngOnInit(): void {
    if(this.authService.isAuthenticated){
      this.basketSubscription = this.basketService.basketItemCountSubject$.subscribe(count=>{
        this.basketItemLength = count.toString();
      })

    }
    // this.menuItems = [
    //   { label: 'Home', icon: 'pi pi-home', routerLink: [''] },
    //   { label: 'Products', icon: 'pi pi-shop', routerLink: ['/products'] },
    //   { label: 'Admin', icon: 'pi pi-shield', routerLink: ['/admin'], visible: this.authService.isAuthenticated }
    // ];
  }

  onLogout() {
    this.authService.logout()
    localStorageClear();
  }
  
  loadComponent(deneme:any){
    this.dynamicLoadComponentService.loadComponent(ComponentType.DropdownBasketsComponent,this.dynamicLoadComponentDirective.viewContainerRef)
  }

  ngOnDestroy(): void {
   
  }

}

