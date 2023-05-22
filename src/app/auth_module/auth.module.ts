import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth/auth.component';
import {LoginComponent} from './login/login.component';
import {SignUpComponent} from './sign-up/sign-up.component';
import {BaseModule} from '../base_module/base.module';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { VerifyMailComponent } from './verify-mail/verify-mail.component';


@NgModule({
  declarations: [
    AuthComponent,
    LoginComponent,
    SignUpComponent,
    ForgotPasswordComponent,
    VerifyMailComponent
  ],
  imports: [
    CommonModule,
    BaseModule.forChild(),
    AuthRoutingModule
  ]
})
export class AuthModule { }
