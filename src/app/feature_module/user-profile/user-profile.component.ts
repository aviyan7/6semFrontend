import {Component, HostListener, OnInit} from '@angular/core';
import {FeatureService} from "../services/feature.service";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  user: any;
  allUserPosts: Array<any> = new Array<any>();
  postsLength: number | undefined = 0;
  groups: Array<any> = new Array<any>();
  groupsLength: number | undefined = 0;
  currentPage = 0;
  pageSize = 1;
  constructor(
    private featureService: FeatureService
  ) {
  }

  ngOnInit(): void {
    this.getUser();
  }

  getUser(){
    this.featureService.getCurrentUser().subscribe({
      next: (response: any)=>{
        this.user = response;
        console.log("haha",this.user);
      },
      complete: () => {
        this.getUserPost();
      }
    })
  }
  getUserPost(){
    this.featureService.getUserPost(this.currentPage, this.pageSize).subscribe({
      next: (response: any)=>{
        this.allUserPosts.push(...response?.content);
        if(this.allUserPosts?.length > 0){
          this.postsLength = this.allUserPosts?.length;
          // this.postsLength = this.allUserPosts?.length + 1;
        }
        this.allUserPosts?.forEach((f: any)=>{
          if(!this.groups.includes(f?.subGroupName?.subGroupId)){
            this.groups.push(f?.subGroupName?.subGroupId);
          }
        })
        if(this.groups?.length > 0){
          this.groupsLength = this.groups?.length;
          // this.groupsLength = this.groups?.length + 1;
        }
      }
    })

  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event: any) {
    const windowHeight = 'innerHeight' in window ? window.innerHeight : document.documentElement.offsetHeight;
    const body = document.body;
    const html = document.documentElement;
    const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);

    const windowBottom = windowHeight + window.pageYOffset;
    if (windowBottom >= docHeight) {
      this.currentPage++;
      this.getUserPost();
    }
  }

}
