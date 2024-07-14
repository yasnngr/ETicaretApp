import { Component, OnInit } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { RoleService } from '../../../../Services/common/models/role.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { finalize } from 'rxjs';
import { SpinnerService } from '../../../../Services/admin/spinner/spinner.service';
import { AlertService } from '../../../../Services/admin/alert.service';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [InputTextModule,ButtonModule,ReactiveFormsModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss'
})
export class CreateComponent implements OnInit{
  roleForm!: FormGroup
  constructor(private roleService:RoleService,private formBuilder:FormBuilder,private spinnerService:SpinnerService,private alertService:AlertService){}

  ngOnInit(): void {
    this.formRoleCreated()
  }

  formRoleCreated() {
    this.roleForm = this.formBuilder.group({
      name: [null, [
        Validators.required,
        Validators.minLength(3)
      ]]
    })
  }

  createRoleOnSubmit(value:string){
    this.spinnerService.showSpinner();
    this.roleService.createRole(value).pipe(
      finalize(()=>{
        this.spinnerService.hideSpinner();
      })
    ).subscribe({
      next:res=>{
        if(res.succeeded)
          this.alertService.successMessage(`Role has been created.`);
        else
          this.alertService.errorMessage("You cannot create a role with the same name.");
      },
      error:err=>{
        this.alertService.errorMessage(err);
      }
    });
  }
}
