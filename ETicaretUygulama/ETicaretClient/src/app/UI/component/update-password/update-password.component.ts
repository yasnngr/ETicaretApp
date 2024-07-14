import { Component, OnInit } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { PasswordModule } from 'primeng/password';
import { NgIf } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { UserAuthService } from '../../../Services/common/models/user-auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../Services/common/models/user.service';
import { AlertService } from '../../../Services/admin/alert.service';
import { SpinnerService } from '../../../Services/admin/spinner/spinner.service';
import { finalize, mergeMap } from 'rxjs';
import { PasswordValidationService } from '../../../Services/common/validation/password-validation.service';


@Component({
  selector: 'app-update-password',
  standalone: true,
  imports: [InputTextModule,ButtonModule,PasswordModule, NgIf,ReactiveFormsModule],
  templateUrl: './update-password.component.html',
  styleUrl: './update-password.component.scss'
})
export class UpdatePasswordComponent implements OnInit {

  updatePasswordForm !: FormGroup

  userId:string;

  resetToken:string;

  state : boolean = false;

  constructor(private fb:FormBuilder, private userAuthService:UserAuthService, private activatedRoute:ActivatedRoute,
    private userService:UserService,private alertService:AlertService,private spinnerService:SpinnerService,
    private router:Router,private passwordValidationService:PasswordValidationService){}

    updatePasswordFormCreate(){
      this.updatePasswordForm = this.fb.group({
        password:["",[
          Validators.required,
        ]],
        confirmPassword:["",[
          Validators.required
        ]]
      },{validators:this.passwordMachValidator})
    }

  ngOnInit(): void {
    this.spinnerService.showSpinner()
    this.updatePasswordFormCreate();
    this.activatedRoute.params.pipe(
      mergeMap(params=>{
        this.userId = params["userId"];
        this.resetToken = params["resetToken"];
        return this.userAuthService.verifyResetToken(this.resetToken,this.userId);
      })
    ).pipe(
      finalize(()=>{
        this.spinnerService.hideSpinner();
      })
    ).subscribe({
      next:res=>{
        this.state = res.state
      }
    })
  }

  onSubmitForm(value){
    this.spinnerService.showSpinner();
    this.userService.updatePassword(this.userId,this.resetToken,value.password,value.confirmPassword).pipe(
      finalize(()=>{
        this.spinnerService.hideSpinner()
      })
    ).subscribe({
      next:res=>{
        this.alertService.successMessage("Your password has been changed")
        this.router.navigateByUrl("login");
      }
    })
  }
  get password() {
    return this.updatePasswordForm.get('password');
  }

  passwordMachValidator(group: FormGroup): ValidationErrors | null {
    const pass = group.get('password')?.value || '';
    const confirmPass = group.get('confirmPassword')?.value || '';
    return pass === confirmPass ? null : { notSame: true };
  }

  getPasswordValidation(condition: string): string {
    return this.passwordValidationService.getPasswordValidationClass(condition, this.password?.value || '');
  }

  
}
