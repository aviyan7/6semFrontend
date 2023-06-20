import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import {AbstractControl, UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {finalize} from 'rxjs';
import {imageResizerConfig} from '../../core_module/utils/image-resizer-util';
// import {readAndCompressImage} from 'browser-image-resizer';
import {ToastrService} from 'ngx-toastr';
import {FeatureService} from '../services/feature.service';
import {CreatePostRequestModel} from '../models/create-post-request.model';
import {AuthService} from '../../auth_module/services/auth.service';
import {CreateSubgroupComponent} from "../create-subgroup/create-subgroup.component";
// import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit {
  uploadPercent: number | undefined;

  postForm: UntypedFormGroup = new UntypedFormGroup({});

  submitted: boolean = false;

  postRequestModel: CreatePostRequestModel = new CreatePostRequestModel();
  subGroup: Array<any> = new Array<any>();

  constructor(
    private location: Location,
    private formBuilder: UntypedFormBuilder,
    private toastr: ToastrService,
    private featureService: FeatureService,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.postForm = this.formBuilder.group({
      postName: [undefined, Validators.compose([Validators.required])],
      description: [undefined, Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(1500)])],
      subGroup: [undefined, Validators.compose([Validators.required])]
    })
    this.getUserDetails();
    this.getAllSubGroup();
  }

  getUserDetails() {

  }

  getAllSubGroup(){
    this.featureService.getAllSubGroups().subscribe({
      next: (response: any)=>{
        this.subGroup = response;
      }
    })
  }

  get form(): { [key: string]: AbstractControl } {
    return this.postForm.controls;
  }

  onSubmit() {
    this.postRequestModel.postName = this.form['postName'].value;
    this.postRequestModel.description = this.form['description'].value;
    this.postRequestModel.subGroupName = this.form['subGroup'].value;
    // this.postRequestModel.id = uuidv4();
    this.postRequestModel.totalVotes = [''];
    this.postRequestModel.comments = [''];
    // this.postForm.valid && this.postRequestModel.postImages?.length
    if (this.postForm.valid) {
      this.featureService.savePostDetails(this.postRequestModel).subscribe({
        next: (response: any) => {
          this.toastr.success("Post Created Successfully", "Success");
          this.onNavigateBack();
        },
        error: (err: any) => {
          this.toastr.error("Something went wrong and unable to create post", "Error Occurs");
        }
      });
    } else {
      this.toastr.warning("Please fill all the field details", "Warning");
    }

  }

  async uploadFile(event: any) {
    const file = event.target.files[0];

    // const resizedImage = await readAndCompressImage(file, imageResizerConfig);

    // const filePath = file.name;

    // const fileRef = this.storage.ref(filePath);
    //
    // const task = this.storage.upload(filePath, resizedImage);

    // task.percentageChanges().subscribe((percentage: any) => {
    //   this.uploadPercent = percentage;
    // });
    //
    // task
    //   .snapshotChanges()
    //   .pipe(
    //     finalize(() => {
    //       fileRef.getDownloadURL().subscribe((url: any) => {
    //         this.postRequestModel.postImages.push(url);
    //         this.toastr.success('Image upload successfully !', 'Success');
    //       }, (error:any) => {
    //         this.toastr.error('Something went wrong, Could not upload Image !', 'Error Occurs');
    //       });
    //     })
    //   )
    //   .subscribe();
  }

  onNavigateBack() {
    this.location.back();
  }
}
