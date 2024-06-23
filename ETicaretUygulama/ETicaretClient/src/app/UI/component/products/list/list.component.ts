import { CurrencyPipe, NgIf } from '@angular/common';
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ImageModule } from 'primeng/image';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { PaginatorModule } from 'primeng/paginator';
import { ProductService } from '../../../../Services/common/models/product.service';
import { List_Product } from '../../../../Contracts/List_Product';
import { ActivatedRoute, Route, Router, RouterLink } from '@angular/router';
import {  mergeMap } from 'rxjs';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CurrencyPipe, ImageModule, TagModule, ButtonModule,
    PaginatorModule,NgIf
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent implements OnInit, OnChanges {
  first: number = 0;
  rows: number = 12;
  products: List_Product[];
  totalProduct:number;
  totalProductCount:number;
  currentPageNo: number;

  constructor(private productService: ProductService, private activatedRoute: ActivatedRoute,private route : Router) {
    
  
  }
  ngOnChanges(changes: SimpleChanges): void {
    
  }

  ngOnInit(): void {
    this.activatedRoute.params.pipe(
      mergeMap(params=>{
        this.currentPageNo = parseInt(params["pageNo"]?? 1 )
        return this.productService.read(this.currentPageNo - 1, this.rows) 
      })
    ).subscribe(res=>{
      this.products = res.products
      this.totalProductCount = res.totalProductCount
    })
   
  }

  onPageChange(event: PageEvent) {
    this.first = event.first;
    this.rows = event.rows;
    this.route.navigateByUrl(`products/${event.page + 1 }`).then(()=>{
      window.scrollTo(0,0)
    })
    console.log(event)
  }

  getProductImageSrc(product:List_Product):string{
    if (product.productImagesFile && product.productImagesFile.length > 0) {
      const showcaseImage = product.productImagesFile.find(img => img.showcase);
      if (showcaseImage) {
        return `https://localhost:7243/${showcaseImage.path}`;
      } else {
        return `https://localhost:7243/${product.productImagesFile[0].path}`;
      }
    }
    return 'assets/default-product-image.webp';
  }
}

interface PageEvent {
  first?: number;
  rows?: number;
  page?: number;
  pageCount?: number;
}