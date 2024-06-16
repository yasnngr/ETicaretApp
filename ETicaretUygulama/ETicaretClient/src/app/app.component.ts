import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { SplitButtonModule } from 'primeng/splitbutton';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { AuthService } from './Services/common/auth/auth.service';
import { NgIf } from '@angular/common';
import { AlertService } from './Services/admin/alert.service';
import { SocialLoginModule } from '@abacritt/angularx-social-login';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, InputTextModule, ButtonModule,
    ToastModule, RouterOutlet, RouterLink, NgxSpinnerModule,
    ConfirmDialogModule, SplitButtonModule, ConfirmPopupModule, NgIf
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  constructor(public authService: AuthService, private router: Router) {
    authService.identityCheck()
  }

  onLogout() {
    this.authService.logout()
  }
}

