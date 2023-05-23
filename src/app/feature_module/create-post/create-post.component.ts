import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import {AbstractControl, UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {finalize} from 'rxjs';
import {imageResizerConfig} from '../../core_module/utils/image-resizer-util';
// import {readAndCompressImage} from 'browser-image-resizer';
// import {ToastrService} from 'ngx-toastr';
// import {AngularFireDatabase} from '@angular/fire/compat/database';
// import {AngularFireStorage} from '@angular/fire/compat/storage';
import {FeatureService} from '../services/feature.service';
import {CreatePostRequestModel} from '../models/create-post-request.model';
import {AuthService} from '../../auth_module/services/auth.service';
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

  constructor(
    private location: Location,
    private formBuilder: UntypedFormBuilder,
    // private toastr: ToastrService,
    // private database: AngularFireDatabase,
    // private storage: AngularFireStorage,
    private featureService: FeatureService,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.postForm = this.formBuilder.group({
      location: [undefined, Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(20)])],
      description: [undefined, Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(1500)])],
    })
    this.getUserDetails();
  }

  getUserDetails() {
    // this.authService.getUser().subscribe((user: any) => {
    //   console.log(user);
    //  this.authService.getSavedUserDetailsById(user?.uid).subscribe({
    //    next: (res: any) => {
    //      this.postRequestModel.createdByUser = res;
    //      console.log('this.postRequestModel.createdByUser: ', this.postRequestModel.createdByUser);
    //    }, error: (err: any) => {
    //    },
    //  });
    // });
  }

  get form(): { [key: string]: AbstractControl } {
    return this.postForm.controls;
  }

  onSubmit() {
    this.postRequestModel.location = this.form['location'].value;
    this.postRequestModel.description = this.form['description'].value;
    this.postRequestModel.createdDate = new Date();
    // this.postRequestModel.id = uuidv4();
    this.postRequestModel.totalLikes = [''];
    this.postRequestModel.comments = [''];
    if (this.postForm.valid && this.postRequestModel.postImages?.length) {
      this.featureService.savePostDetails(this.postRequestModel).subscribe({
        next: (response: any) => {
          // this.toastr.success("Post Created Successfully", "Success");
          this.onNavigateBack();
        },
        error: (err: any) => {
          // this.toastr.success("Something went wrong and unable to create post", "Error Occurs");
        }
      });
    } else {
      // this.toastr.warning("Please fill all the field details", "Warning");
    }

  }

  async uploadFile(event: any) {
    const file = event.target.files[0];

    // const resizedImage = await readAndCompressImage(file, imageResizerConfig);

    const filePath = file.name;

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
