import { Component, Input, ViewChild, viewChild } from '@angular/core';
import { FileUploadOptions } from '../file-update/file-update.component';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { FileUpload, FileUploadModule } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';
import { BadgeModule } from 'primeng/badge';
import { CommonModule } from '@angular/common';
import { ProgressBarModule } from 'primeng/progressbar';
import { HttpClientService } from '../http-client.service';
import { HttpHeaders } from '@angular/common/http';
import { AlertService } from '../../admin/alert.service';
import { FileUploadServiceService } from './file-upload-service.service';



@Component({
  selector: 'app-file-upload',
  standalone: true,
  imports: [DialogModule, ButtonModule, NgFor, ProgressBarModule, FileUploadModule, ToastModule, CommonModule, BadgeModule, NgClass, NgIf],
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.scss'
})
export class FileUploadComponent {
  files = [];

  totalSize: number = 0;

  uploadUrl: string;

  totalSizePercent: number = 0;

  fileData: FormData = new FormData;

  constructor(private generateUrl: FileUploadServiceService, private config: PrimeNGConfig, private alertService: AlertService) { }

  choose(event, callback) {
    callback();
  }

  onRemoveTemplatingFile(event, file, removeFileCallback, index) {
    removeFileCallback(event, index)
    console.log(event, file, removeFileCallback, index);
    this.totalSize -= parseInt(this.formatSize(file.size));
    this.totalSizePercent = this.totalSize / 10;
  }

  onClearTemplatingUpload(clear) {
    clear();
    this.totalSize = 0;
    this.totalSizePercent = 0;
  }

  onTemplatedUpload() {
    this.alertService.successMessage("Upload Success")
  }

  onSelectedFiles(event) {
    this.uploadUrl = this.generateUrl.generateUploadImageUrl({
      controller: "products",
      action: "Upload",
      queryString: "id=8ff842a7-92aa-49bd-9c8b-431a74e3a825",
      headers: new HttpHeaders({ "responseType": "blob" })
    })
    for (let file of event.currentFiles) {
      this.files.push(file)
      this.fileData.append(file.name, file, file.name)
    }
    this.files.forEach((file) => {
      this.totalSize += parseInt(this.formatSize(file.size));
    });
    this.totalSizePercent = this.totalSize / 10;
  }

  uploadEvent(callback) {
    callback();
  }

  formatSize(bytes) {
    const k = 1024;
    const dm = 3;
    const sizes = this.config.translation.fileSizeTypes;
    if (bytes === 0) {
      return `0 ${sizes[0]}`;
    }

    const i = Math.floor(Math.log(bytes) / Math.log(k));
    const formattedSize = parseFloat((bytes / Math.pow(k, i)).toFixed(dm));

    return `${formattedSize} ${sizes[i]}`;
  }
}
