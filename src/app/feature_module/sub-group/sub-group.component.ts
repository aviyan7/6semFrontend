import {Component, EventEmitter, Input, Output} from '@angular/core';
import {PostActionRequestDetailsModel} from "../models/post-action-request-details.model";
import {FeatureService} from "../services/feature.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ToastrService} from "ngx-toastr";
import {AuthService} from "../../auth_module/services/auth.service";
import {CreatePostRequestModel} from "../models/create-post-request.model";
import {PostCommentComponent} from "../post-comment/post-comment.component";

@Component({
  selector: 'app-sub-group',
  templateUrl: './sub-group.component.html',
  styleUrls: ['./sub-group.component.scss']
})
export class SubGroupComponent {
  user: any;
  @Input() allSubGroups: Array<any> = new Array<any>();
  @Output() postTriggered: EventEmitter<any> = new EventEmitter<any>();
  postActionRequestDetailsModel: PostActionRequestDetailsModel = new PostActionRequestDetailsModel();
  showAllComments: boolean = false;
  subGroups: any;
  constructor(
    private featureService: FeatureService,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private authService: AuthService,
  ) {
  }

  ngOnInit(): void {
    // this.getUser();
    this.getAllSubGroups();
  }

  getAllSubGroups(){
    this.featureService.getAllSubGroups().subscribe({
      next: (response: any)=>{
        this.subGroups = response;
      }
    })
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
            this.postTriggered.emit();
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

  onJoinSubGroup(data: any){
    console.log("data",data);
    this.featureService.joinsubGroup(data?.id).subscribe({
      next: (response: any)=>{
        this.toastr.success('Group joined successfully !', 'Success');
      }
    })
  }

  showAllComment(data: boolean){
    data ? this.showAllComments = false : this.showAllComments = true;
  }

}
