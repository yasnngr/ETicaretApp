import { Component, OnInit } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { DividerModule } from 'primeng/divider';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { TooltipModule } from 'primeng/tooltip';
import { User } from '../../../Entities/user';
import { UserService } from '../../../Services/common/models/user.service';
import { AlertService } from '../../../Services/admin/alert.service';
import { Create_User } from '../../../Contracts/Users/Create_User';
import { NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SpinnerService } from '../../../Services/admin/spinner/spinner.service';
import { finalize } from 'rxjs';
import { PasswordValidationService } from '../../../Services/common/validation/password-validation.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [InputTextModule,DividerModule,PasswordModule,ButtonModule,ReactiveFormsModule,FormsModule,TooltipModule,NgClass,RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit{
  
  registerForm!:FormGroup;

  constructor(private formBuilder:FormBuilder, private userService:UserService,private alertService:AlertService,
    private spinnerService:SpinnerService,private passwordValidationService:PasswordValidationService) {
    
  }

  ngOnInit(): void {
    this.registerFormCreate()

  }
 
  registerFormCreate(){
    this.registerForm = this.formBuilder.group({
      nameSurname:["",[
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50)
      ]],
      userName:["",[
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30)
      ]],
      email:["",[
        Validators.required,
        Validators.email,
        Validators.minLength(3)
      ]],
      password:["",[
        Validators.required,
        Validators.minLength(5),
        this.passwordPatternValidator()
      ]],
      confirmPassword:["",[
        Validators.required,
      ]]

    },{validators:this.passwordMachValidator})
  }

  get password() {
    return this.registerForm.get('password');
  }
  
  passwordMachValidator(group: FormGroup): ValidationErrors | null {
    const pass = group.get('password')?.value || '';
    const confirmPass = group.get('confirmPassword')?.value || '';
    return pass === confirmPass ? null : { notSame: true };
  }

  passwordPatternValidator() {
    return Validators.pattern(/(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{5,}/);
  }

  getPasswordValidation(condition: string) {
    return this.passwordValidationService.getPasswordValidationClass(condition,this.password?.value || "")
  }

  onSubmit(userInfo:User){
    this.spinnerService.showSpinner()
    this.userService.create(userInfo).pipe(
      finalize(()=>{
        this.spinnerService.hideSpinner()
      })
    ).subscribe({
      next:(response)=>{
        if(response.success){
        this.alertService.successMessage(response.message)
      }else{
        this.alertService.errorMessage(response.message)
      }
      },
      error:(err)=>{
        this.alertService.errorMessage(err.error.message)
      }
    })
  }
}
