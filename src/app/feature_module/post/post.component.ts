import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FeatureService} from "../services/feature.service";
import {CreatePostRequestModel} from "../models/create-post-request.model";
import {PostCommentComponent} from "../post-comment/post-comment.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ToastrService} from "ngx-toastr";
import {AuthService} from "../../auth_module/services/auth.service";
import {PostActionRequestDetailsModel} from "../models/post-action-request-details.model";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent {
  user: any;
  @Input() allUserPosts: Array<any> = new Array<any>();
  @Output() postTriggered: EventEmitter<any> = new EventEmitter<any>();
  postActionRequestDetailsModel: PostActionRequestDetailsModel = new PostActionRequestDetailsModel();
  showAllComments: boolean = false;
  allPosts: Array<any> = new Array<any>();
  constructor(
    private featureService: FeatureService,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private authService: AuthService,
  ) {
  }

  ngOnInit(): void {
    // this.getUser();
  }

  // getUser(){
  //   this.featureService.getCurrentUser().subscribe({
  //     next: (response: any)=>{
  //       this.user = response;
  //       console.log("haha",this.user);
  //     },
  //     complete: () => {
  //       this.getUserPost();
  //     }
  //   })
  // }
  // getUserPost(){
  //   this.featureService.getUserPost().subscribe({
  //     next: (response: any)=>{
  //       console.log("vay",response);
  //       this.allUserPosts = response;
  //     }
  //   })
  // }

  onVoteBtnClick() {
    // this.postActionRequestDetailsModel.upVote
    // post.totalVotes?.push(this.postActionRequestDetailsModel);

    // this.featureService.updatePostDetails(post, Object.keys(FilterUtil.filterObjectIfIdMatched(this.allPosts, post?.id))[0]).subscribe({
    //   next: (res: any) => {
    //     this.getAllPosts();
    //   },
    //   error: (error: any) => {},
    // });
  }

  onWriteComment(post: CreatePostRequestModel) {
    const modalRef = this.modalService.open(PostCommentComponent);
    modalRef.componentInstance.responseEmitter.subscribe((response: any) => {
      if (response) {
        this.postActionRequestDetailsModel.text = response;
        this.postActionRequestDetailsModel.postId = post.id;

        // post?.comments?.push(this.postActionRequestDetailsModel);
        this.featureService.postComment(this.postActionRequestDetailsModel).subscribe({
          next: (response: any)=>{
            this.toastr.success('Comment posted successfully !', 'Success');
            this.postTriggered.emit(post);
            // this.getUserPost();
            this.modalService.dismissAll();
          },
          error: (error: any) => {
            this.toastr.error('Something went wrong, Unable to post the comment !', 'Error Occurs');
          },
        })

      } else {
        this.modalService.dismissAll();
      }
    });
  }

  showAllComment(data: boolean){
    data ? this.showAllComments = false : this.showAllComments = true;
  }
}
