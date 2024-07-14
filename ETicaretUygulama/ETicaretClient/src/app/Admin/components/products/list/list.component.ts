import { Component, Output, ViewChild } from '@angular/core';
import { BaseComponent } from '../../../../base/base.component';
import { ButtonModule } from 'primeng/button';
import { TableLazyLoadEvent, TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { FileUploadModule } from 'primeng/fileupload';
import { RatingModule } from 'primeng/rating';
import { TagModule } from 'primeng/tag';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputNumberModule } from 'primeng/inputnumber';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { ProductService } from '../../../../Services/common/models/product.service';
import { List_Product } from '../../../../Contracts/List_Product';
import { HttpErrorResponse } from '@angular/common/http';
import { AlertService } from '../../../../Services/admin/alert.service';
import { FileUpdateComponent, FileUploadOptions } from '../../../../Services/common/file-update/file-update.component';
import { TooltipModule } from 'primeng/tooltip';
import { EditProductComponent} from '../../../../Services/common/edit-product/edit-product.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { DatePipe } from '@angular/common';

@Component({
    selector: 'app-list',
    standalone: true,
    imports: [
            BaseComponent, ButtonModule, TableModule, 
            ToastModule, ToolbarModule, FileUploadModule, RatingModule,
            TagModule, DialogModule, DropdownModule, RadioButtonModule,
            InputNumberModule, ConfirmDialogModule,FileUpdateComponent,
            TooltipModule,EditProductComponent,DatePipe],
    templateUrl: './list.component.html',
    styleUrl: './list.component.scss',
})
export class ListComponent extends BaseComponent {
    @Output() fileUploadOptions:Partial<FileUploadOptions>={
        controller:"products",
        action:"upload",
        explanation:"Add your image folder",
        icon:"pi pi-plus",
        label:"Import",
    }
    @Output() fileUploadProduct:Partial<FileUploadOptions>={
        controller:"products",
        action:"upload",
        explanation:"Add your image folder",
        accept:".jpeg, .png, .jpg",
        icon:"pi pi-plus",
        text:true,
        className:"p-button-rounded"
    }
    
    @ViewChild('clickEvent') clickEvent : EditProductComponent;
    
    productDialog: boolean = false;

    products!: List_Product[];

    product!: List_Product;

    selectedProducts!: List_Product[] | null;

    submitted: boolean = false;

    statuses!: any[];

    page: number;

    size: number;

    totalCount: number;

    constructor( 
        private confirmationService: ConfirmationService, 
        private productService: ProductService, 
        private alertService: AlertService,
        ngxSpinner:NgxSpinnerService) 
        {
            super(ngxSpinner)
        }

    lazyLoadPagination(event: TableLazyLoadEvent) {
        this.showSpinner()
        this.page = event.first / event.rows
        this.size = event.rows
        this.getProducts()
    }

    getProducts() {
        this.productService.read(this.page, this.size).subscribe({
            next: (datas) => {
                this.hideSpinner()
                this.products = datas.products;
                this.totalCount = datas.totalProductCount
            },
            error: (error: HttpErrorResponse) => {
                this.hideSpinner()
                this.alertService.errorMessage(error.message)
            }
        })
    }
    
    deleteProduct(product: List_Product) {
        console.log(product)
        this.confirmationService.confirm({
            message: `Are you sure you want to delete ${product.name} ?`,
            header: 'Warning',
            icon: 'pi pi-exclamation-triangle',
            acceptButtonStyleClass:"p-button-danger p-button-text",
            rejectButtonStyleClass:"p-button-text p-button-text",
            accept: () => {
                this.showSpinner()
                this.productService.delete(product.id).subscribe({
                    next: () => {
                        this.lazyLoadPagination({
                            first: this.page * this.size,
                            rows: this.size
                        })
                        this.hideSpinner()
                        this.alertService.infoMessage("Product removed succesfully")
                    },
                    error:(err:HttpErrorResponse)=>{
                        this.alertService.errorMessage(err.message)
                    }
                })
            }
        });
    }
    
    addProductImage(productId:string){
        console.log(productId)
        this.fileUploadProduct.queryString=`id=${productId}`
    }

    deleteSelectedProducts() {
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete the selected products?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.products = this.products.filter((val) => {
                    !this.selectedProducts?.includes(val)
                    console.log(val.id)

                });
                console.log(this.selectedProducts)
                this.selectedProducts = null;
            }
        });
    }

    hideDialog() {
        this.productDialog = false;
        this.submitted = false;
    }

    findIndexById(id: string): number {
        let index = -1;
        for (let i = 0; i < this.products.length; i++) {
            if (this.products[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    }

    // createId(): string {
    //     let id = '';
    //     var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    //     for (var i = 0; i < 5; i++) {
    //         id += chars.charAt(Math.floor(Math.random() * chars.length));
    //     }
    //     return id;
    // }

    // getSeverity(status: string) {
    //     switch (status) {
    //         case 'INSTOCK':
    //             return 'success';
    //         case 'LOWSTOCK':
    //             return 'warning';
    //         case 'OUTOFSTOCK':
    //             return 'danger';
    //     }
}



