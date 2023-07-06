import {Component, EventEmitter, Output} from '@angular/core';
import {HttpEventType, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {Location} from "@angular/common";
import {UntypedFormBuilder, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {FeatureService} from "../../../feature_module/services/feature.service";
import {AuthService} from "../../../auth_module/services/auth.service";
import {ImageCompressorService} from "../../../feature_module/services/image-compressor.service";
import {FileUploadService} from "../../../feature_module/services/file-upload.service";

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent {
  selectedFiles?: FileList;
  progressInfos: any[] = [];
  message: string[] = [];
  @Output() image = new EventEmitter<any>();
  imageName: any[] = [];

  previews: string[] = [];
  imageInfos?: Observable<any>;

  constructor(
    private location: Location,
    private formBuilder: UntypedFormBuilder,
    private toastr: ToastrService,
    private featureService: FeatureService,
    private authService: AuthService,
    private imageCompressorService: ImageCompressorService,
    private uploadService: FileUploadService
  ) {
  }

  ngOnInit(): void {

  }
  selectFiles(event: any): void {
    this.message = [];
    this.progressInfos = [];
    this.selectedFiles = event.target.files;
    if(event.target.files[0].name){
      console.log("hhahah",event.target.files[0].name);
    }
    this.imageName.push(event.target.files[0].name);
    this.previews = [];
    if (this.selectedFiles && this.selectedFiles[0]) {
      const numberOfFiles = this.selectedFiles.length;
      for (let i = 0; i < numberOfFiles; i++) {
        const reader = new FileReader();

        reader.onload = (e: any) => {
          console.log(e.target.result);
          this.previews.push(e.target.result);
        };
        console.log("kakakak",this.previews);

        reader.readAsDataURL(this.selectedFiles[i]);
      }
    }
  }

  upload(idx: number, file: File): void {
    this.progressInfos[idx] = { value: 0, fileName: file.name };
    console.log("thishahah",this.selectedFiles);
    if (file) {
      this.uploadService.upload(file).subscribe(
        (event: any) => {
          if (event.type === HttpEventType.UploadProgress) {
            this.progressInfos[idx].value = Math.round(100 * event.loaded / event.total);
          } else if (event instanceof HttpResponse) {
            this.toastr.success("Image Uploaded Successfully", "Image Upload");
            this.image.emit(this.imageName);

            // this.imageInfos = this.uploadService.getFiles();
            // this.imageInfos?.forEach((f: any)=>{
            //   console.log("hawa",f?.url);
            // })

          }
        },
        (err: any) => {
          this.progressInfos[idx].value = 0;
          this.toastr.error("Something went wrong couldnot upload the file", "Error Occurs");
          // const msg = 'Could not upload the file: ' + file.name;
          // this.message.push(msg);
        });
    }
  }

  uploadFiles(): void {
    this.message = [];
    if (this.selectedFiles) {
      for (let i = 0; i < this.selectedFiles.length; i++) {
        this.upload(i, this.selectedFiles[i]);
      }
    }
  }

  deletePreview(data: any){
    this.previews = [];
  }

}
