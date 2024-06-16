import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { RouterLink, RouterOutlet } from '@angular/router';
import { PanelMenuModule } from 'primeng/panelmenu';
import { SidebarModule } from 'primeng/sidebar';
import { RippleModule } from 'primeng/ripple';
import { AvatarModule } from 'primeng/avatar';
import { StyleClassModule } from 'primeng/styleclass';


@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [ButtonModule, MenuModule, RouterOutlet, RouterLink, PanelMenuModule, SidebarModule, RippleModule, AvatarModule, StyleClassModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {

  divStyle = { "width": "280px" }

  sidebarVisible: boolean = false;

  addClass: Partial<responseCol> = {
    addClassSideBar: "col-12 md:col-12 lg:col-1 transition-duration-300",
    addClassRouter: "col-12 md:col-12 lg:col-10 align-items-start transition-duration-300",
    addClassThird: "col-12 md:col-12 lg:col-1"
  }

  showSideBar() {
    this.sidebarVisible = !this.sidebarVisible
    if (this.sidebarVisible) {
      this.addClass = {
        addClassSideBar: "col-12 md:col-12 lg:col-2 transition-duration-300",
        addClassRouter: "col-12 md:col-12 lg:col-9 align-items-start transition-duration-300",
        addClassThird: "col-12 md:col-12 lg:col-1"
      }
    } else {
      this.addClass = {
        addClassSideBar: "col-12 md:col-12 lg:col-1 transition-duration-300",
        addClassRouter: "col-12 md:col-12 lg:col-10 align-items-start transition-duration-300",
        addClassThird: "col-12 md:col-12 lg:col-1 transition-duration-300"
      }
    }
  }
}

export class responseCol {
  addClassSideBar?: string;
  addClassRouter?: string;
  addClassThird?: string;
}