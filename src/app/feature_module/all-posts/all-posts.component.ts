import {Component, HostListener, OnInit} from '@angular/core';
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
  showAllComments: boolean = false;
  loading = false;
  currentPage = 0;
  pageSize = 1;

  allPosts: Array<any> = new Array<any>();

  postActionRequestDetailsModel: PostActionRequestDetailsModel = new PostActionRequestDetailsModel();
  constructor(
    private featureService: FeatureService,
    private toastr: ToastrService,
    private authService: AuthService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    if(localStorage.getItem('allPost')){
      let a = localStorage.getItem('allPost');
      this.allPosts.push(a);
      this.allPosts = JSON.parse(this.allPosts[0]);
      localStorage.removeItem('allPost');
    } else {
      this.getAllPosts();
      this.getUserDetails();
    }
  }

  getPostAfterComment(event: any){
    console.log("eve",event);
    this.allPosts?.forEach((f: any)=>{
      if(f?.id==event?.id){
        f.comment = event?.comment;
      }
    })
    localStorage.setItem('allPost',JSON.stringify(this.allPosts));
    window.location.reload();
  }

  getAllPosts() {
    this.featureService.getAllPosts(this.currentPage, this.pageSize).subscribe({
      next: (res: any) => {
        console.log("allpos",res?.content);
        // this.allPosts.push(...res?.content);
        this.allPosts.push(...res?.content);
        // this.allPosts = res?.content;
      },
      error: (err: any) => {
        this.toastr.error("Something went wrong and unable to get posts", "Error Occurs");
      },
    });
  }

  sellAllComments(data: boolean){
    data ? this.showAllComments = false : this.showAllComments = true;
  }

  getUserDetails() {
    // this.authService.getUser();
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
        this.postActionRequestDetailsModel.text = response;
        this.postActionRequestDetailsModel.postId = post.id;

        // post?.comments?.push(this.postActionRequestDetailsModel);
        this.featureService.postComment(this.postActionRequestDetailsModel).subscribe({
          next: (response: any)=>{
            this.toastr.success('Comment posted successfully !', 'Success');
                this.getAllPosts();
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

  onLikeBtnClick(post: CreatePostRequestModel) {
    // this.postActionRequestDetailsModel.upVote
    post.totalVotes?.push(this.postActionRequestDetailsModel);

    // this.featureService.updatePostDetails(post, Object.keys(FilterUtil.filterObjectIfIdMatched(this.allPosts, post?.id))[0]).subscribe({
    //   next: (res: any) => {
    //     this.getAllPosts();
    //   },
    //   error: (error: any) => {},
    // });
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event: any) {
    const windowHeight = 'innerHeight' in window ? window.innerHeight : document.documentElement.offsetHeight;
    const body = document.body;
    const html = document.documentElement;
    const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);

    const windowBottom = windowHeight + window.pageYOffset;
    if (windowBottom >= docHeight && !this.loading) {
      this.currentPage++;
      this.getAllPosts();
    }
  }
}
