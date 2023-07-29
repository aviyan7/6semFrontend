import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from './auth_module/login/login.component';

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
  // {
  //   path: 'admin',
  //   loadChildren: () => import('./admin_module/admin.module').then((m)=>m.AdminModule)
  // },
  { path: '**', redirectTo: '/auth/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
