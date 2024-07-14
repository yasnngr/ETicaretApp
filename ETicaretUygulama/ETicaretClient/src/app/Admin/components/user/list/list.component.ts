import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../Services/common/models/user.service';
import { TableLazyLoadEvent, TableModule } from 'primeng/table';
import { List_Users } from '../../../../Contracts/Users/List_Users';
import { NgClass } from '@angular/common';
import { ListDialogComponent } from './list-dialog/list-dialog.component';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [TableModule,ListDialogComponent],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent implements OnInit {

  users !: List_Users;

  selectedUser : []

  page : number;
  
  size : number;
  constructor(private userService:UserService){}

  ngOnInit(): void {
  }
  
  getUsers(){
    this.userService.getAllUsers(this.page,this.size).subscribe(res=>{
      this.users = res
    })
  }

  lazyLoadPagination(event: TableLazyLoadEvent){
    this.page = event.first / event.rows
    this.size = event.rows
    this.getUsers();
  }

}
