import { Component } from '@angular/core';
import {AbstractControl, UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {error} from "@angular/compiler-cli/src/transformers/util";

@Component({
  selector: 'app-verify-password',
  templateUrl: './verify-password.component.html',
  styleUrls: ['./verify-password.component.scss']
})
export class VerifyPasswordComponent {
  btnStatus: string = 'Reset Password';

  errorMessage: string = '';

  passwordForm: UntypedFormGroup = new UntypedFormGroup({});

  submitted: boolean = false;

  showPassword: boolean = false;

  constructor(
    private authService: AuthService,
    private formBuilder: UntypedFormBuilder,
    private router: Router,
    private toastr: ToastrService
  ) {
  }

  ngOnInit(): void {
    this.initLoginForm();
  }

  initLoginForm() {
    this.passwordForm = this.formBuilder.group({
      email: [
        null,
        Validators.compose([Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)])
      ],
      currentPassword: [
        null,
        Validators.compose([Validators.required, Validators.minLength(6)])
      ],
      newPassword: [
        null,
        Validators.compose([Validators.required, Validators.minLength(6)])
      ],
      rePassword: [
        null,
        Validators.compose([Validators.required, Validators.minLength(6)])
      ]
    });
  }

  get form(): { [key: string]: AbstractControl } {
    return this.passwordForm.controls;
  }

  onResetPassword(passwordDetails: any){
    this.submitted = true;
    if(this.passwordForm.valid){
      this.btnStatus = 'Please Wait ...';
      const {currentPassword, newPassword, rePassword} = passwordDetails;
      this.authService.resetPassword(passwordDetails).subscribe((response: any)=>{

      }), (error: any)=>{
        this.toastr.warning('Credentials do not match !', 'Warning');
      }
    }
  }

  onUserLogin(loginDetails: any) {
    this.submitted = true;
    if (this.passwordForm.valid) {
      this.btnStatus = 'Please Wait ...';
      const { email, password } = loginDetails;
      this.authService.loginUser(loginDetails).subscribe((response: any)=>{
        console.log("hhh",response);
        if(localStorage.getItem('role')=='ADMIN'){
          this.router.navigate(['/admin']);
        } else {
          this.router.navigate(['/home/dashboard']);
        }
        // localStorage.setItem('role', response?.role[0]?.authority);
        this.toastr.success('Sign In successfully !', 'Success');

        // if(response?.role[0]?.authority == 'ADMIN'){
        //   this.router.navigate(['/admin/']);
        // } else {
        //   this.router.navigate(['/home/dashboard']);
        // }
      }, (error: any)=>{
        this.toastr.warning('Credentials do not match !', 'Warning');
      })
    }
  }

  onLogOut(){
    console.log(localStorage);
    localStorage.clear();
  }

  onPasswordToggle() {
    this.showPassword = !this.showPassword;
  }

  onPasswordReset() {
    this.router.navigate(['/auth/forgot-password']);
  }

  onCreateAccount() {
    this.router.navigate(['/auth/signup']);
  }

}
