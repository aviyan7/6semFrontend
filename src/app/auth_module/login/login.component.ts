import {Component, OnInit} from '@angular/core';
import {
  Validators,
  AbstractControl,
  UntypedFormGroup, UntypedFormBuilder
} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../services/auth.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  btnStatus: string = 'Sign In';

  errorMessage: string = '';

  loginForm: UntypedFormGroup = new UntypedFormGroup({});

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
    this.loginForm = this.formBuilder.group({
      email: [
        null,
        Validators.compose([Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)])
      ],
      password: [
        null,
        Validators.compose([Validators.required, Validators.minLength(6)])
      ]
    });
  }

  get form(): { [key: string]: AbstractControl } {
    return this.loginForm.controls;
  }

  onUserLogin(loginDetails: any) {
    this.submitted = true;
    if (this.loginForm.valid) {
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
