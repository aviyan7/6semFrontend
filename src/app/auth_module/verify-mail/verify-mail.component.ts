import { Component, OnInit } from '@angular/core';
import {AbstractControl, UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-verify-mail',
  templateUrl: './verify-mail.component.html',
  styleUrls: ['./verify-mail.component.scss']
})
export class VerifyMailComponent implements OnInit {
  btnStatus: string = 'Verify OTP and Activate Account';

  errorMessage: string = '';

  otpPasswordForm: UntypedFormGroup = new UntypedFormGroup({});
  email: any;

  submitted: boolean = false;
  expiryNumber: number = 120;

  constructor(
    private authService: AuthService,
    private formBuilder: UntypedFormBuilder,
    private router: Router,
    private toastr: ToastrService
  ) {
  }

  ngOnInit(): void {
    this.email = localStorage.getItem('email');
    this.initLoginForm();
    this.expiry();
  }

  expiry(){
    const myIntervalProcess = setInterval(() => {
      this.expiryNumber--;
    }, 1000);

    setTimeout(() => {
      clearInterval(myIntervalProcess);
      this.expiryNumber = 0;
    }, 120000);
    // const token = localStorage.getItem('token');
    // console.log("token",token);
    // // @ts-ignore
    // const encodedPayload = token.split('.')[1];
    // const decodedPayload = JSON.parse(window.atob(encodedPayload));
    // console.log("deco",decodedPayload);
  }

  initLoginForm() {
    this.otpPasswordForm = this.formBuilder.group({
      otp: [
        null,
        Validators.compose([Validators.required])
      ],
      email: [this.email]
    });
  }

  get form(): { [key: string]: AbstractControl } {
    return this.otpPasswordForm.controls;
  }

  onClickSentLink(loginDetails: any) {
    this.submitted = true;
    if (this.otpPasswordForm.valid) {
      this.btnStatus = 'Please Wait ...';

      const { otp, email } = loginDetails;
      this.authService.onVerifyOTP(loginDetails).subscribe({
        next: (response: any)=>{
          localStorage.clear();
          this.toastr.success('Account successfully activated !', 'Success');
          this.router.navigate(['/']);
        },
        error: err => {
          this.submitted = false;
          this.btnStatus = 'Verify OTP and Activate Account';
          this.toastr.error(err.message, 'Error Occurs. Please Try Again.');
        }
      })
    }
  }

}
