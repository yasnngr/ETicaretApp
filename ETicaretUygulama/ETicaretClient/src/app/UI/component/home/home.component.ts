import { Component } from '@angular/core';
import { RatingModule } from 'primeng/rating';
import { DataViewModule } from 'primeng/dataview';
import { TagModule } from 'primeng/tag';
import { NgClass, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RatingModule,DataViewModule,TagModule,NgClass,NgIf,NgFor],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

   products =[{
    
    id: '1000',
    code: 'f230fh0g3',
    name: 'Bamboo Watch',
    description: 'Product Description',
    image: 'bamboo-watch.jpg',
    price: 65,
    category: 'Accessories',
    quantity: 24,
    inventoryStatus: 'INSTOCK',
    rating: 5
},{
  
  id: '1000',
  code: 'f230fh0g3',
  name: 'Bamboo Watch',
  description: 'Product Description',
  image: 'bamboo-watch.jpg',
  price: 65,
  category: 'Accessories',
  quantity: 24,
  inventoryStatus: 'INSTOCK',
  rating: 5
},{
  
id: '1000',
code: 'f230fh0g3',
name: 'Bamboo Watch',
description: 'Product Description',
image: 'bamboo-watch.jpg',
price: 65,
category: 'Accessories',
quantity: 24,
inventoryStatus: 'INSTOCK',
rating: 5
}] 
}
