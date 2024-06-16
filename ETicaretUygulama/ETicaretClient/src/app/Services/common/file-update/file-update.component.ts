import { Component, Input } from '@angular/core';
import { FileSystemFileEntry, NgxFileDropEntry, NgxFileDropModule } from 'ngx-file-drop';
import { NgForOf } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { HttpClientService } from '../http-client.service';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { AlertService } from '../../admin/alert.service';
import { ConfirmationService } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
import { BaseComponent } from '../../../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';



@Component({
  selector: 'app-file-update',
  standalone: true,
  imports: [NgxFileDropModule, NgForOf, ButtonModule,DialogModule],
  templateUrl: './file-update.component.html',
  styleUrl: './file-update.component.scss',
  providers: []

})
export class FileUpdateComponent extends BaseComponent {
 
  @Input() options: Partial<FileUploadOptions>

  visible: boolean = false;

  showDialog() {
      this.visible = true;
  }

  public files: NgxFileDropEntry[] = [];

  constructor
  (
    private httpClientService: HttpClientService, 
    private alertService: AlertService, 
    private confirmationService: ConfirmationService,
    ngxSpinner:NgxSpinnerService
  ){
    super(ngxSpinner)
   }
    
    public selectedFiles(files: NgxFileDropEntry[]) {
    this.files = files;
    const fileData: FormData = new FormData();

    for (const file of files) {
      (file.fileEntry as FileSystemFileEntry).file((_file) => {
        fileData.append(_file.name, _file, file.relativePath)
      })
    };
    this.confirmationService.confirm({
      message: 'Are you sure you want to upload file?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      acceptButtonStyleClass: "p-button-danger p-button-text",
      rejectButtonStyleClass: "p-button-text p-button-text",
      accept: ()=>{
        this.showSpinner();
        this.httpClientService.post({
          controller: this.options.controller,
          action: this.options.action,
          queryString: this.options.queryString,
          headers: new HttpHeaders({ "responseType": "blob" })
        }, fileData).subscribe({
          next: () => {
            this.hideSpinner();
            this.alertService.successMessage("The file has been successfully uploaded ")
          },
          error: (err: HttpErrorResponse) => {
            this.hideSpinner();
            this.alertService.errorMessage(err.message)
          }
        })
      }
    })
    
  }
}
export class FileUploadOptions {
  controller?: string;
  action?: string;
  queryString?: string;
  explanation?: string;
  accept?: string;
  text?:boolean;
  icon?:string;
  label?:string;
  className?:string;
}
// public fileOver(event){
//   console.log(event);
// }

// public fileLeave(event){
//   console.log(event);
// }

// uploadHandler(event) {
//   const fileData: FormData = new FormData

//   for (let file of event.files) {
//     this.uploadedFiles.push(file)
//     fileData.append(file.name, file, file.name)
//   }

//   this.httpClientService.post({
//     controller: "products",
//     action: "upload",
//     headers: new HttpHeaders({ "responseType": "blob" })
//   }, fileData).subscribe({
//     next: () => {
//       fileData.delete
//       this.alertService.successMessage("Resim ekleme başarılı")
//     },
//     error: () => {
//       this.alertService.errorMessage("Resim eklenememiştir")
//     }
//   })
// }