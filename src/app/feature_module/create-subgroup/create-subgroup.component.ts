import { Component } from '@angular/core';
import {AbstractControl, UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {Location} from "@angular/common";
import {ToastrService} from "ngx-toastr";
import {FeatureService} from "../services/feature.service";
import {AuthService} from "../../auth_module/services/auth.service";
import {Createsubgroup} from "../models/createsubgroup.model";
import {ImageCompressorService} from "../services/image-compressor.service";
import {Observable} from "rxjs";
import {FileUploadService} from "../services/file-upload.service";
import {HttpEventType, HttpResponse} from "@angular/common/http";

@Component({
  selector: 'app-create-subgroup',
  templateUrl: './create-subgroup.component.html',
  styleUrls: ['./create-subgroup.component.scss']
})
export class CreateSubgroupComponent {

  subGroupForm: UntypedFormGroup = new UntypedFormGroup({});
  previewUrl: string | undefined;
  uploadProgress: number | undefined;

  submitted: boolean = false;
  subGroupRequestModel: Createsubgroup = new Createsubgroup();
  selectedFiles?: FileList;
  progressInfos: any[] = [];
  message: string[] = [];
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
  ) { }

  ngOnInit(): void {
    this.subGroupForm = this.formBuilder.group({
      name: [undefined, Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(20)])],
      description: [undefined, Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(1500)])],
      // image:[undefined, Validators.compose([Validators.required])]
    })
    this.getUserDetails();
    // this.imageInfos = this.uploadService.getFiles();
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.imageCompressorService.compressImage(file)
      .then((compressedImage: any) => {
        this.previewUrl = compressedImage.previewUrl;
        // Call your image upload API here passing the compressedImage.file
      })
      .catch((error: any)=> {
        console.error('Error compressing image:', error);
      });
  }

  deletePreview() {
    this.previewUrl = '';
    this.subGroupForm?.get('image')?.patchValue(null);
  }
  getUserDetails() {

  }

  get form(): { [key: string]: AbstractControl } {
    return this.subGroupForm?.controls;
  }

  onSubmit() {
    this.subGroupRequestModel.name = this.form['name'].value;
    this.subGroupRequestModel.description = this.form['description'].value;
    // this.subGroupRequestModel.images = this.imageName;
    // this.postRequestModel.id = uuidv4();
    if (this.subGroupForm?.valid) {
      this.featureService.saveSubGroup(this.subGroupRequestModel).subscribe({
        next: (response: any) => {
          this.toastr.success("Group Created Successfully", "Success");
          this.onNavigateBack();
        },
        error: (err: any) => {
          this.toastr.error("Something went wrong and unable to create group", "Error Occurs");
        }
      });
    } else {
      this.toastr.warning("Please fill all the field details", "Warning");
    }

  }

  onNavigateBack() {
    this.location.back();
  }


  selectFiles(event: any): void {
    this.message = [];
    this.progressInfos = [];
    this.selectedFiles = event.target.files;
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
            // const msg = 'Uploaded the file successfully: ' + file.name;
            // this.message.push(msg);
            this.imageInfos = this.uploadService.getFiles();
            this.imageInfos?.forEach((f: any)=>{
              console.log("hawa",f?.url);
            })
            // console.log("this",this.imageInfos?);
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

  getImages(data: any){
    this.subGroupRequestModel.images = data;
  }

}
