import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import {redirectLoggedInTo, redirectUnauthorizedTo} from '@angular/fire/auth-guard';
// import {AngularFireAuthGuard} from '@angular/fire/compat/auth-guard';
import {LoginComponent} from './auth_module/login/login.component';

// const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['auth/login']);
// const redirectLoggedInToHome = () => redirectLoggedInTo(['home/dashboard']);

const routes: Routes = [
  {
    path: 'signin',
    component: LoginComponent,
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/auth/login',
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./feature_module/feature.module').then((m) => m.FeatureModule),
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./auth_module/auth.module').then((m) => m.AuthModule),
  },
  { path: '**', redirectTo: '/auth/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
