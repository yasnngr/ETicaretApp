import { Component, OnInit } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { NgIf } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserAuthService } from '../../../Services/common/models/user-auth.service';

@Component({
  selector: 'app-password-reset',
  standalone: true,
  imports: [InputTextModule,ButtonModule,NgIf,ReactiveFormsModule],
  templateUrl: './password-reset.component.html',
  styleUrl: './password-reset.component.scss'
})
export class PasswordResetComponent implements OnInit{

passwordResetForm !: FormGroup

constructor(private fb:FormBuilder,private userAuthService:UserAuthService){}
 
ngOnInit(): void {
  this.passwordResetFormCreate();
}

passwordResetFormCreate(){
  this.passwordResetForm = this.fb.group({
    email:["",[
      Validators.required,
      Validators.email
    ]]
  })
}

onSubmitForm(value){
  this.userAuthService.passwordReset(value)
}
}
