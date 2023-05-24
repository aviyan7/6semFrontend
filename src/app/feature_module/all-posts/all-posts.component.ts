import { Component, OnInit } from '@angular/core';
import {FeatureService} from '../services/feature.service';
import {CreatePostRequestModel} from '../models/create-post-request.model';
import {PostActionRequestDetailsModel} from '../models/post-action-request-details.model';
import {AuthService} from '../../auth_module/services/auth.service';
import {FilterUtil} from '../../core_module/utils/filter-util';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {PostCommentComponent} from '../post-comment/post-comment.component';
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-all-posts',
  templateUrl: './all-posts.component.html',
  styleUrls: ['./all-posts.component.scss']
})
export class AllPostsComponent implements OnInit {

  Object = Object;

  allPosts: Array<any> = new Array<any>();

  postActionRequestDetailsModel: PostActionRequestDetailsModel = new PostActionRequestDetailsModel();
  constructor(
    private featureService: FeatureService,
    private toastr: ToastrService,
    private authService: AuthService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.getAllPosts();
    this.getUserDetails();
  }

  getAllPosts() {
    this.featureService.getAllPosts().subscribe({
      next: (res: any) => {
        this.allPosts = res;
      },
      error: (err: any) => {
        // this.toastr.error("Something went wrong and unable to get posts", "Error Occurs");
      },
    });
  }

  getUserDetails() {
    // this.authService.getUser().subscribe((user: any) => {
    //   this.authService.getSavedUserDetailsById(user?.uid).subscribe({
    //     next: (res: any) => {
    //       this.postActionRequestDetailsModel.user = res;
    //     }, error: (err: any) => {
    //     },
    //   });
    // });
  }

  onWriteCommentBtnClick(post: CreatePostRequestModel) {
    const modalRef = this.modalService.open(PostCommentComponent);
    modalRef.componentInstance.responseEmitter.subscribe((response: any) => {
      if (response) {
        this.postActionRequestDetailsModel.date = new Date();
        // @ts-ignore
        this.postActionRequestDetailsModel['comments'] = response;
        this.postActionRequestDetailsModel['user'] = this.postActionRequestDetailsModel.user;
        post.comments?.push(this.postActionRequestDetailsModel);
        this.featureService.updatePostDetails(post, Object.keys(FilterUtil.filterObjectIfIdMatched(this.allPosts, post?.id))[0]).subscribe({
          next: (res: any) => {
            // this.toastr.success('Comment posted successfully !', 'Success');
            this.getAllPosts();
            this.modalService.dismissAll();
          },
          error: (error: any) => {
            // this.toastr.error('Something went wrong, Unable to post the comment !', 'Error Occurs');
            this.modalService.dismissAll();
          },
        });
      } else {
        this.modalService.dismissAll();
      }
    });
  }

  onLikeBtnClick(post: CreatePostRequestModel) {
    this.postActionRequestDetailsModel.date = new Date();
    post.totalLikes?.push(this.postActionRequestDetailsModel);
    this.featureService.updatePostDetails(post, Object.keys(FilterUtil.filterObjectIfIdMatched(this.allPosts, post?.id))[0]).subscribe({
      next: (res: any) => {
        this.getAllPosts();
      },
      error: (error: any) => {},
    });
  }
}
