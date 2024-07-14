import { Component } from '@angular/core';
import { ListComponent } from './list/list.component';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [ListComponent],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent {

}
