import { Component } from '@angular/core';
import { CreateComponent } from './create/create.component';
import { ListComponent } from './list/list.component';


@Component({
  selector: 'app-role',
  standalone: true,
  imports: [CreateComponent,ListComponent],
  templateUrl: './role.component.html',
  styleUrl: './role.component.scss'
})
export class RoleComponent {

}
