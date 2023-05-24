import {Component, OnInit} from '@angular/core';
import {AbstractControl, UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
import {ToastrService} from "ngx-toastr";
// import {AngularFireDatabase} from '@angular/fire/compat/database';
//
// import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  btnStatus: string = 'Register';

  errorMessage: string = '';

  signUpForm: UntypedFormGroup = new UntypedFormGroup({});

  submitted: boolean = false;

  showPassword: boolean = false;

  constructor(
    private authService: AuthService,
    private formBuilder: UntypedFormBuilder,
    private router: Router,
    private toastr: ToastrService,
    // private database: AngularFireDatabase
  ) {
  }

  ngOnInit(): void {
    this.initLoginForm();
  }

  initLoginForm() {
    this.signUpForm = this.formBuilder.group({
      fullName: [
        undefined,
        Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(25)])
      ],
      email: [
        undefined,
        Validators.compose([Validators.required, Validators.email, Validators.minLength(2)])
      ],
      password: [
        undefined,
        Validators.compose([Validators.required, Validators.minLength(6)])
      ]
    });
  }

  get form(): { [key: string]: AbstractControl } {
    return this.signUpForm.controls;
  }

  onUserLogin(loginDetails: any) {
    this.submitted = true;
    if (this.signUpForm.valid) {
      this.btnStatus = 'Please Wait ...';

      const {email, password} = loginDetails;
      this.router.navigateByUrl('/');
      // this.authService
      //   .onSignUp(email, password)
      //   .then((res: any) => {
      //     console.log('loginDetails?.userloginDetails?.userloginDetails?.user: ', res?.user);
      //     this.toastr.success('Sign up successfully.', 'Success');
      //     loginDetails.uid = res?.user?.uid;
      //     this.authService.saveUserDetailsOnRegisterUser(loginDetails).subscribe({});
      //     this.authService.sendVerificationEmailLink(res?.user).then((response: any) => {
      //       this.toastr.success('Please check your mail and verify your email to continue !', 'Success');
      //     }, (error: any) => {
      //       this.toastr.error("Something went wrong and unable to send the verification email address !");
      //     });
      //     this.signUpForm.reset();
      //     this.router.navigateByUrl('/');
      //   })
      //   .catch((err: any) => {
      //     this.btnStatus = 'Register';
      //     this.toastr.error(err.message, 'Error Occurs', {closeButton: true});
      //   });
    }
  }

  onPasswordToggle() {
    this.showPassword = !this.showPassword;
  }

  onClickToLogin() {
    this.router.navigate(['/auth/login'])
  }

}
