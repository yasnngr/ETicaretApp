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

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [InputTextModule,DividerModule,PasswordModule,ButtonModule,ReactiveFormsModule,FormsModule,TooltipModule,NgClass,RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit{
  
  registerForm!:FormGroup;

  constructor(private formBuilder:FormBuilder, private userService:UserService,private alertService:AlertService,private spinnerService:SpinnerService) {
    
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

  get hasUpperCase() {
    const password = this.password?.value;
    return password ? /[A-Z]/.test(password) : false;
  }
  
  get hasNumber() {
    const password = this.password?.value;
    return password ? /\d/.test(password) : false;
  }
  
  get hasSpecialChar() {
    const password = this.password?.value;
    return password ? /[\W_]/.test(password) : false;
  }
  getPasswordValidationClass(condition: string) {
    const password = this.password?.value;
    
    if (!password) {
      return 'text-gray-600 text-sm mr-2  transition-duration-300';
    }

    switch (condition) {
      case 'hasUpperCase':
        return this.hasUpperCase ? 'text-green-400 pi pi-check text-sm mr-2 transition-duration-300' : 'text-red-400 pi pi-times text-sm mr-3 transition-duration-300';
      case 'hasNumber':
        return this.hasNumber ? 'text-green-400 pi pi-check text-sm mr-2 transition-duration-300' : 'text-red-400 pi pi-times text-sm mr-3 transition-duration-300';
      case 'hasSpecialChar':
        return this.hasSpecialChar ? 'text-green-400 pi pi-check text-sm mr-2 transition-duration-300' : 'text-red-400 pi pi-times text-sm mr-3 transition-duration-300';
      default:
        return 'text-gray-600 text-sm mr-2  transition-duration-300';
    }
  }

  onSubmit(userInfo:User){
    this.spinnerService.showSpinner()
    this.userService.create(userInfo).subscribe({
      next:(response)=>{
        this.spinnerService.hideSpinner()
        if(response.success){
        this.alertService.successMessage(response.message)
      }else{
        this.alertService.errorMessage(response.message)
      }
      },
      error:(err)=>{
        this.spinnerService.hideSpinner()
        this.alertService.errorMessage(err.error.message)
      }
    })
  }
}
