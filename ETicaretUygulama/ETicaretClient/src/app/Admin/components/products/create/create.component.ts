import { Component, OnInit, Output } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '../../../../Services/common/models/product.service';
import { Create_Product } from '../../../../Contracts/Create_Product';
import { BaseComponent } from '../../../../base/base.component';
import { ToastModule } from 'primeng/toast';
import { NgxSpinnerService } from 'ngx-spinner';
import { InputNumberModule } from 'primeng/inputnumber';
import { TooltipModule } from 'primeng/tooltip';
import { FloatLabelModule } from 'primeng/floatlabel';
import { EditorModule } from 'primeng/editor';
import { FileUpdateComponent, FileUploadOptions } from '../../../../Services/common/file-update/file-update.component';
import { KeyFilterModule } from 'primeng/keyfilter';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadComponent } from '../../../../Services/common/file-upload/file-upload.component';
import { ChipsModule } from 'primeng/chips';
import { Create_Product_Info } from '../../../../Contracts/product/Create_Product_Info';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [InputTextModule, ButtonModule, ReactiveFormsModule, FormsModule, ToastModule,
    InputNumberModule, TooltipModule, FloatLabelModule, EditorModule, FileUpdateComponent,
    KeyFilterModule, DropdownModule, FileUploadComponent,ChipsModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss',
})
export class CreateComponent extends BaseComponent implements OnInit {

  @Output() fileUploadOption: Partial<FileUploadOptions> = {
    controller: "products",
    action: "upload",
    explanation: "Add your image folder",
    icon: "pi pi-plus",
    label: "Import",
  }
  productForm!: FormGroup

  categories: any[] | undefined;

  selectedCategory: string | undefined;

  constructor
    (
      private formBuilder: FormBuilder,
      private productService: ProductService,
      ngxSpinner: NgxSpinnerService,
    ) {
        super(ngxSpinner)
      }

  ngOnInit(): void {
    this.formCreated()

    this.categories = [
      { name: 'Phone', code: 'PHONE' },
      { name: 'Computer', code: 'COMPUTER' },
      { name: 'TV', code: 'TV' },
      { name: 'Home', code: 'HOME' },
      { name: 'Clotes', code: 'CLOTES' },
      { name: 'Bag', code: 'BAG' },
      { name: 'Accessory', code: 'ACCESSORY' },
      { name: 'Refrigerator', code: 'REFRIGERATOR' },
      { name: 'Airfry', code: 'AIRFRY' },
      { name: 'United States', code: 'US' }
    ];
  }

  formCreated() {
    this.productForm = this.formBuilder.group({
      productName: [null, [
        Validators.required,
        Validators.minLength(5)
      ]],
      productPrice: [null, [
        Validators.required,
        Validators.min(1)
      ]],
      productStock: [null, [
        Validators.required,
        Validators.min(1),
        Validators.pattern(/^\d+$/),
      ]]
    })
  }

  onSubmit(productInfo:Create_Product_Info) {
    this.showSpinner()
    console.log(productInfo)
    const create_product: Create_Product = new Create_Product();
    create_product.name = productInfo.productName;
    create_product.price = productInfo.productPrice;
    create_product.stock = productInfo.productStock;

    this.productService.create(create_product)
  }
  onReset() {
    this.productForm.reset()
  }
}
// create_product.name = name.value;
// create_product.price = parseFloat(price.value);
// create_product.stock = parseInt(stock.value);