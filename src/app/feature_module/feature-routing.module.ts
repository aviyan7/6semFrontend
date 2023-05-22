import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MainBaseComponent} from './main-base/main-base.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {CreatePostComponent} from './create-post/create-post.component';

const routes: Routes = [
  {
    path: '', component: MainBaseComponent,
    children: [
      {path: 'dashboard', component: DashboardComponent, data: {title: 'Application Dashboard'}},
      {path: 'create-new-post', component: CreatePostComponent, data: {title: 'Post Your Idea'}}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeatureRoutingModule { }
