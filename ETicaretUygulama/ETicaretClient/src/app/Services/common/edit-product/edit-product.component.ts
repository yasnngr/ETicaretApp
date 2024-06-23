import { Component, Input } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { TagModule } from 'primeng/tag';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { GalleriaModule } from 'primeng/galleria';
import { List_Product_Images } from '../../../Contracts/List_Product_Images';
import { ProductService } from '../models/product.service';
import { CommonModule } from '@angular/common';
import { CarouselModule } from 'primeng/carousel';
import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent } from '../../../base/base.component';

@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [ButtonModule, TooltipModule, DialogModule,
    DropdownModule, TagModule, RadioButtonModule, InputNumberModule,
    InputTextModule, GalleriaModule, CommonModule,CarouselModule],
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.scss',
})

export class EditProductComponent extends BaseComponent{

  visible: boolean = false;

  images: List_Product_Images[] | undefined;

  productInfo: List_Product_Info;

  displayCustom: boolean | undefined;

  activeIndex: number = 0;

  constructor(private productService: ProductService,ngxSpinner:NgxSpinnerService) {
    super(ngxSpinner)
   }


   showCase(imageId:string){
    console.log("imageId="+imageId, "productId="+this.productInfo.id)
    this.productService.changeShowcaseImage(imageId,this.productInfo.id)
   }

  showDialog() {
    this.showSpinner();
    this.getImages();
    this.visible = true;
  }
  getImages(){
    this.productService.readImages(this.productInfo.id).subscribe({
      next: (imageDatas:List_Product_Images[]) => {
        console.log(imageDatas)
        this.hideSpinner()
        this.images = imageDatas;
      }
    })
  }
  
  pushProductInfo(id: string, name: string, stock: number, price: number) {
    this.productInfo = {
      id: id,
      name: name,
      stock: stock,
      price: price
    }
    this.showDialog()
  }
  deleteImage(imageId:string){
    this.productService.deleteImage(this.productInfo.id,imageId).subscribe({
      next:data=>{
        this.getImages()
        console.log(data)
      }
    })
  }

  responsiveOptions: any[] = [
    {
      breakpoint: '1500px',
      numVisible: 5
    },
    {
      breakpoint: '1024px',
      numVisible: 3
    },
    {
      breakpoint: '768px',
      numVisible: 2
    },
    {
      breakpoint: '560px',
      numVisible: 1
    }
  ];

  imageClick(index: number) {
    console.log(index)
    this.activeIndex = index;
    this.displayCustom = true;
  }
}

export class List_Product_Info {
  id?: string;
  name?: string;
  stock?: number;
  price?: number;
}