import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {AuthComponent} from './auth/auth.component';
import {SignUpComponent} from './sign-up/sign-up.component';
import {ForgotPasswordComponent} from './forgot-password/forgot-password.component';
import {VerifyMailComponent} from './verify-mail/verify-mail.component';
import {VerifyPasswordComponent} from "./verify-password/verify-password.component";

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
      },
      {
        path: 'login',
        component: LoginComponent,
        data : {title: 'Login Details'}
      },
      {
        path: 'signup',
        component: SignUpComponent,
        data : {title: 'Create New Account'}
      },
      {
        path: 'forgot-password',
        component: ForgotPasswordComponent,
        data : {title: 'Forgot Account Password'}
      },
      {
        path: 'verify-email',
        component: VerifyMailComponent,
        data : {title: 'Verify Your Email'}
      },
      {
        path: 'verify-password',
        component: VerifyPasswordComponent,
        data : {title: 'Change Your Password'}
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
