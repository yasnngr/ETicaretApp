import { Routes } from '@angular/router';
import { LayoutComponent } from './Admin/layout/layout.component';
import { DashboardComponent } from './Admin/components/dashboard/dashboard.component';
import { HomeComponent } from './UI/component/home/home.component';
import { authGuard } from './Guards/common/auth.guard';

export const routes: Routes = [
    {path:"admin",component:LayoutComponent,children:[
        {path:"", component:DashboardComponent,canActivate:[authGuard]},
        {path:"customers",loadComponent:()=>import("./Admin/components/customers/customers.component").then(x=>x.CustomersComponent),canActivate:[authGuard]},
        {path:"products",loadComponent:()=>import("./Admin/components/products/products.component").then(x=>x.ProductsComponent),canActivate:[authGuard],children:[
            {path:"create",loadComponent:()=>import("./Admin/components/products/create/create.component").then(x=>x.CreateComponent),canActivate:[authGuard]},
            {path:"list",loadComponent:()=>import("./Admin/components/products/list/list.component").then(x=>x.ListComponent),canActivate:[authGuard]}
        ]},
        {path:"orders",loadComponent:()=>import("./Admin/components/orders/orders.component").then(x=>x.OrdersComponent)},
    ],canActivate:[authGuard]},
    {path:"",component:HomeComponent},
    {path:"baskets",loadComponent:()=>import("./UI/component/baskets/baskets.component").then(x=>x.BasketsComponent)},
    {path:"products",loadComponent:()=>import("./UI/component/products/products.component").then(x=>x.ProductsComponent)},
    {path:"register",loadComponent:()=>import("./UI/component/register/register.component").then(x=>x.RegisterComponent)},
    {path:"login",loadComponent:()=>import("./UI/component/login/login.component").then(x=>x.LoginComponent)}
];
