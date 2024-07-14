import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { User_Login } from '../../../Contracts/Users/User_Login';
import { AuthService } from '../../../Services/common/auth/auth.service';
import { SpinnerService } from '../../../Services/admin/spinner/spinner.service';
import { AlertService } from '../../../Services/admin/alert.service';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { DividerModule } from 'primeng/divider';
import { GoogleSigninButtonModule, SocialAuthService, SocialLoginModule, SocialUser } from '@abacritt/angularx-social-login';
import { UserAuthService } from '../../../Services/common/models/user-auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [PasswordModule, ReactiveFormsModule, ButtonModule,
    RouterLink, InputTextModule, IconFieldModule,
    InputIconModule, InputGroupModule, InputGroupAddonModule,
    DividerModule, GoogleSigninButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup

  constructor(private formBuilder: FormBuilder,
    private authService: AuthService, private spinnerService: SpinnerService,
    private alertService: AlertService, private activetedRouter: ActivatedRoute,
    private router: Router, private socialAuthService: SocialAuthService, private userAuthService: UserAuthService) 
    {
    socialAuthService.authState.subscribe((user: SocialUser) => {
      this.spinnerService.showSpinner()
      this.userAuthService.googleLogin(user).subscribe({
        next: (res) => {
          if (res) {
            localStorage.setItem("accessToken", res.token.accessToken)
            localStorage.setItem("refleshToken", res.token.refleshToken)
            this.authService.identityCheck();
            this.router.navigate(["/"])
            this.spinnerService.hideSpinner()
          }
          this.spinnerService.hideSpinner
          this.alertService.successMessage("Login with Google")
        },
        error: (err) => {
          this.spinnerService.hideSpinner()
          this.alertService.errorMessage(err)
        }
      })
    })
  }

  ngOnInit(): void {
    this.loginFormCreate();
  }
  loginFormCreate() {
    this.loginForm = this.formBuilder.group({
      usernameOrEmail: ["", [
        Validators.required
      ]],
      password: ["", [
        Validators.required
      ]]
    })
  }

  onSubmit(userLogin: User_Login) {
    this.spinnerService.showSpinner()
    this.userAuthService.login(userLogin).subscribe({
      next: (res) => {
        localStorage.setItem("accessToken", res.token.accessToken);
        localStorage.setItem("refleshToken", res.token.refleshToken);
        // localStorage.setItem("expiration", res.token.expiration.toString());
        // this.authService.identityCheck();
        this.activetedRouter.queryParams.subscribe(params => {
          const returnUrl: string = params["returnUrl"]
          if (!returnUrl)
            this.router.navigate(["/"])
          this.router.navigate([returnUrl])
        });
        this.spinnerService.hideSpinner();
        this.alertService.successMessage("User login successful")
      },
      error: (err) => {
        this.spinnerService.hideSpinner();
        this.alertService.errorMessage(err.message);
      }
    });
  }

 
}
