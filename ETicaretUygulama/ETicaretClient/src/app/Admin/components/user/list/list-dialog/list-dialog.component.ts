import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BadgeModule } from 'primeng/badge';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { DialogModule } from 'primeng/dialog';
import { RoleService } from '../../../../../Services/common/models/role.service';
import { SpinnerService } from '../../../../../Services/admin/spinner/spinner.service';
import { AlertService } from '../../../../../Services/admin/alert.service';
import { finalize } from 'rxjs';
import { UserService } from '../../../../../Services/common/models/user.service';

@Component({
  selector: 'app-list-dialog',
  standalone: true,
  imports: [DialogModule,CheckboxModule,FormsModule,NgFor,BadgeModule,ButtonModule],
  templateUrl: './list-dialog.component.html',
  styleUrl: './list-dialog.component.scss'
})
export class ListDialogComponent implements OnInit{
  
  dialogVisible: boolean = false;

  userId : string;

  roles : string[];

  selectedRoles: string[] = [];

  constructor(private roleService:RoleService,private spinnerService:SpinnerService,private alertService:AlertService,private userService:UserService){}
  
  ngOnInit(): void {
   
  }
  
  assimgRole(){
    this.spinnerService.showSpinner();
    this.userService.assignRoleToUser(this.userId,this.selectedRoles).pipe(
      finalize(()=>{
        this.spinnerService.hideSpinner();
      })
    ).subscribe({
      next:res=>{
        this.alertService.successMessage("Role assignment successful.")
      },
      error:err=>{
        this.alertService.errorMessage(err);
      }
    })
  }

  userDialogDetail(event){
    this.dialogVisible = true;
    this.userId = event.data.id
    console.log(event)
    this.userService.getRolesToUser(this.userId).pipe(
      finalize(()=>{
        this.spinnerService.hideSpinner();
      })
    ).subscribe({
      next:res=>{
        if(res)
          this.selectedRoles = res.userRoles;
        else
        this.selectedRoles = [];
      },
      error:err=>{
        this.alertService.errorMessage(err);
      }
    })
    this.roleService.getRoles(-1,-1).pipe(
      finalize(()=>{
        this.spinnerService.hideSpinner();
      })
    ).subscribe({
      next:res=>{
        this.roles = res.datas.map(r=>r.name);
      },
      error:err=>{
        this.alertService.errorMessage(err)
      }
    })
  }
  
}
