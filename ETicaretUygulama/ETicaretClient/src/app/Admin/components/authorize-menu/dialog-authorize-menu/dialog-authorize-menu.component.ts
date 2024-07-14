import { ChangeDetectorRef, Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule} from '@angular/forms';
import {  NgFor } from '@angular/common';
import { BadgeModule } from 'primeng/badge';
import { RoleService } from '../../../../Services/common/models/role.service';
import { finalize } from 'rxjs';
import { AuthorizationEndpointService } from '../../../../Services/common/models/authorization-endpoint.service';
import { ButtonModule } from 'primeng/button';
import { SpinnerService } from '../../../../Services/admin/spinner/spinner.service';
import { AlertService } from '../../../../Services/admin/alert.service';


@Component({
  selector: 'app-dialog-authorize-menu',
  standalone: true,
  imports: [DialogModule,CheckboxModule,FormsModule,NgFor,BadgeModule,ButtonModule],
  templateUrl: './dialog-authorize-menu.component.html',
  styleUrl: './dialog-authorize-menu.component.scss'
})
export class DialogAuthorizeMenuComponent implements OnInit{
  
  dialogVisible: boolean = false;

  roles : string[];

  menuName : string;

  roleCode : string;

  selectedRoles: string[] = [];

  nodesName : string;
  
  constructor(
    private roleService:RoleService,private authorizationEndpointService:AuthorizationEndpointService,
    private spinnerService:SpinnerService, private alertService:AlertService,private cdr : ChangeDetectorRef 
  ){
   
  }

  ngOnInit(): void {
    this.spinnerService.showSpinner();
   
  }

  assimgRole(){
    this.spinnerService.showSpinner();
    this.authorizationEndpointService.assignRoleEndpoint(this.selectedRoles,this.roleCode,this.menuName).pipe(
      finalize(()=>{
        this.spinnerService.hideSpinner();
      })
    ).subscribe({
      next:res=>{
        this.alertService.successMessage("Role assignment successful.")
      },
      error:err=>{
        this.alertService.errorMessage(err)
      }
    })

  }

  authorizeMenuDetail(nodes:any) {
    this.dialogVisible = true;
    this.nodesName = nodes.label + "-Assign a role to the user"
    this.menuName = nodes.parent.label
    this.roleCode =nodes.key
    console.log(this.selectedRoles)
    this.authorizationEndpointService.getRolesToEndpoint(this.roleCode,this.menuName).pipe(
      finalize(()=>{
        this.spinnerService.hideSpinner();
      })
    ).subscribe({
      next : res=>{
        if(res)
            this.selectedRoles = res.roles;
        else
          this.selectedRoles = []    
      },
      error : err=>{
        this.alertService.errorMessage(err)
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
