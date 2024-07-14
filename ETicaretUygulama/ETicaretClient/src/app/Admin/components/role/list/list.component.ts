import { Component, OnInit } from '@angular/core';
import { TableLazyLoadEvent, TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { RoleService } from '../../../../Services/common/models/role.service';
import { finalize, pipe } from 'rxjs';
import { List_Roles } from '../../../../Contracts/role/List_Roles';
import { SpinnerService } from '../../../../Services/admin/spinner/spinner.service';
import { AlertService } from '../../../../Services/admin/alert.service';



@Component({
  selector: 'app-list',
  standalone: true,
  imports: [TableModule,ButtonModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent implements OnInit {
  roleDatas : List_Roles[] = []
  
  totalRoleCount : number;

  page: number;

  size: number;

  constructor(private roleService:RoleService,private spinnerService:SpinnerService,private alertService:AlertService){}
  
  ngOnInit(): void {
  }

  getRoles(){
    this.spinnerService.showSpinner();
    this.roleService.getRoles(this.page,this.size).pipe(
      finalize(()=>{
        this.spinnerService.hideSpinner();
      })
    ).subscribe({
      next:res=>{
        this.totalRoleCount =res.totalCount
        this.roleDatas = res.datas
        console.log(res)
      },
      error:err=>{
        this.alertService.errorMessage(err)
      }
    })
  }
  
  lazyLoadPagination(event: TableLazyLoadEvent){
    this.spinnerService.showSpinner();
    this.page = event.first / event.rows
    this.size = event.rows
    this.getRoles();
  }

  deleteRole(roleId, roleName){
    this.spinnerService.showSpinner();
    this.roleService.deleteRole(roleId).pipe(
      finalize(()=>{
        this.spinnerService.hideSpinner();
      })
    ).subscribe({
      next:res=>{
        this.getRoles()
        this.alertService.infoMessage(`${roleName} has been deleted.`)
      }
    })
    
  }

  
}
