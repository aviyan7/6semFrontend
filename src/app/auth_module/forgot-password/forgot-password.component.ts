import { Component, OnInit } from '@angular/core';
import {AbstractControl, UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  btnStatus: string = 'Send Reset Link';

  errorMessage: string = '';

  forgotPasswordForm: UntypedFormGroup = new UntypedFormGroup({});

  submitted: boolean = false;

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
    this.forgotPasswordForm = this.formBuilder.group({
      email: [
        null,
        Validators.compose([Validators.required, Validators.email, Validators.minLength(2)])
      ]
    });
  }

  get form(): { [key: string]: AbstractControl } {
    return this.forgotPasswordForm.controls;
  }

  onClickSentLink(loginDetails: any) {
    this.submitted = true;
    if (this.forgotPasswordForm.valid) {
      this.btnStatus = 'Please Wait ...';

      const { email } = loginDetails;
      this.authService.onForgotPassword(email).subscribe({
        next: (response: any)=>{
          this.toastr.success('Please check your email and follow the instruction before proceed !', 'Success');
          this.router.navigate(['/auth/verify-password']);
        },
        error: err => {
          this.toastr.error(err.message, 'Error Occurs');
        }
      })
      // this.authService
      //   .onForgotPassword(email)
      //   .then((res: any) => {
      //     this.toastr.success('Please check your email and follow the instruction before proceed !', 'Success');
      //   })
      //   .catch((err: any) => {
      //     this.btnStatus = 'Send Reset Link';
      //     this.submitted = false;
      //     this.toastr.error(err.message, 'Error Occurs', { closeButton: true });
      //   });
    }
  }

  onClickToLogin() {
    this.router.navigate(['/auth/login'])
  }
}
