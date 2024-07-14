import { Component } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { TreeModule } from 'primeng/tree';
import { ApplicationService } from '../../../Services/common/models/application.service';
import { Menu } from '../../../Contracts/Application-Configurations/Menu';
import { TooltipModule } from 'primeng/tooltip';
import { DialogAuthorizeMenuComponent } from './dialog-authorize-menu/dialog-authorize-menu.component';

@Component({
  selector: 'app-authorize-menu',
  standalone: true,
  imports: [TreeModule,TooltipModule,DialogAuthorizeMenuComponent],
  templateUrl: './authorize-menu.component.html',
  styleUrl: './authorize-menu.component.scss'
})
export class AuthorizeMenuComponent {
  nodes!: TreeNode[];

  constructor(private applicationService:ApplicationService){}

  ngOnInit() {
    this.applicationService.getAuthorizeDefinitionEndpoints().subscribe(res=>{
      this.nodes = this.convertMenusToTreeNodes(res)
    })
  }

  convertMenusToTreeNodes(menus: Menu[]): TreeNode[] {
    return menus.map(menu => ({
      label: menu.name,
      children: menu.actions.map(action => ({
        label: action.definition,
        type: 'url',
        key:action.code ,
        data: {
          httpType: action.httpType,
          definition: action.actionType,
        }
      }))
    }));
  }

}
