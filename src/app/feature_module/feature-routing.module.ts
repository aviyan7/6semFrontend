import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MainBaseComponent} from './main-base/main-base.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {CreatePostComponent} from './create-post/create-post.component';
import {CreateSubgroupComponent} from "./create-subgroup/create-subgroup.component";
import {AuthGuard} from "../core_module/auth-guards/auth-guard";
import {UserProfileComponent} from "./user-profile/user-profile.component";

const routes: Routes = [
  {
    path: '', component: MainBaseComponent,
    children: [
      {path: 'dashboard', component: DashboardComponent, data: {title: 'Application Dashboard'}, canActivate: [AuthGuard]},
      {path: 'create-new-post', component: CreatePostComponent, data: {title: 'Post Your Idea'}},
      {path: 'create-new-subGroup', component: CreateSubgroupComponent, data: {title: 'Create New Group'}},
      {path: 'user-profile', component: UserProfileComponent, data: {title: 'User Profile'}}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeatureRoutingModule { }
