import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeatureRoutingModule } from './feature-routing.module';
import { MainBaseComponent } from './main-base/main-base.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import {BaseModule} from '../base_module/base.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CreatePostComponent } from './create-post/create-post.component';
import { AllPostsComponent } from './all-posts/all-posts.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { PostCommentComponent } from './post-comment/post-comment.component';
import { CreateSubgroupComponent } from './create-subgroup/create-subgroup.component';
import { PostComponent } from './post/post.component';
import {ImageCropperModule} from "ngx-image-cropper";
import {CoreModule} from "../core_module/core.module";
import { SubGroupComponent } from './sub-group/sub-group.component';

@NgModule({
  declarations: [
    MainBaseComponent,
    HeaderComponent,
    FooterComponent,
    DashboardComponent,
    CreatePostComponent,
    AllPostsComponent,
    UserProfileComponent,
    PostCommentComponent,
    CreateSubgroupComponent,
    PostComponent,
    SubGroupComponent,
  ],
  imports: [
    CommonModule,
    FeatureRoutingModule,
    BaseModule.forChild(),
    ImageCropperModule,
    CoreModule
  ]
})
export class FeatureModule { }
