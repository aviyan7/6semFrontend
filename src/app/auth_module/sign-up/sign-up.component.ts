import {Component, OnInit} from '@angular/core';
import {AbstractControl, UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
import {ToastrService} from "ngx-toastr";

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
  ) {
  }

  ngOnInit(): void {
    this.initLoginForm();
  }

  initLoginForm() {
    this.signUpForm = this.formBuilder.group({
      firstName: [
        undefined,
        Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(25)])
      ],
      lastName: [
        undefined,
        Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(25)])
      ],
      email: [
        undefined,
        Validators.compose([Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)])
      ],

      address: [
        undefined,
        Validators.compose([Validators.required, Validators.minLength(2)])
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

      const {firstName, lastName, email, password} = loginDetails;
      console.log("hahah",loginDetails);

      this.authService.registerNewUser(loginDetails).subscribe((response: any)=>{
        // localStorage.setItem('token', response.token);
        localStorage.setItem('email',loginDetails.email);
        this.toastr.info('Please Verify your E-mail first');
        this.router.navigate(['/auth/verify-email']);
        // this.toastr.success('User Registered Successfully');
        // this.router.navigateByUrl('/');
      }, (error: any)=>{
        this.toastr.error("Something went wrong!!");
      });
          // this.signUpForm.reset();

    }
  }

  onPasswordToggle() {
    this.showPassword = !this.showPassword;
  }

  onClickToLogin() {
    this.router.navigate(['/auth/login'])
  }

}
