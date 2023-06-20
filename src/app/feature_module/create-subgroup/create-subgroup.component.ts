import { Component } from '@angular/core';
import {AbstractControl, UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {Location} from "@angular/common";
import {ToastrService} from "ngx-toastr";
import {FeatureService} from "../services/feature.service";
import {AuthService} from "../../auth_module/services/auth.service";
import {Createsubgroup} from "../models/createsubgroup.model";
import {ImageCompressorService} from "../services/image-compressor.service";

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

  constructor(
    private location: Location,
    private formBuilder: UntypedFormBuilder,
    private toastr: ToastrService,
    private featureService: FeatureService,
    private authService: AuthService,
    private imageCompressorService: ImageCompressorService
  ) { }

  ngOnInit(): void {
    this.subGroupForm = this.formBuilder.group({
      name: [undefined, Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(20)])],
      description: [undefined, Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(1500)])],
      image:[undefined, Validators.compose([Validators.required])]
    })
    this.getUserDetails();
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
    // this.postRequestModel.id = uuidv4();
    if (this.subGroupForm?.valid) {
      this.featureService.saveSubGroup(this.subGroupRequestModel).subscribe({
        next: (response: any) => {
          this.toastr.success("Group Created Successfully", "Success");
          this.onNavigateBack();
        },
        error: (err: any) => {
          this.toastr.success("Something went wrong and unable to create group", "Error Occurs");
        }
      });
    } else {
      this.toastr.warning("Please fill all the field details", "Warning");
    }

  }

  onNavigateBack() {
    this.location.back();
  }

}
