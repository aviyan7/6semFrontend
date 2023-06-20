import { Component, OnInit } from '@angular/core';
import {FeatureService} from "../services/feature.service";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  user: any;
  allUserPosts: Array<any> = new Array<any>();
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
    this.featureService.getUserPost().subscribe({
      next: (response: any)=>{
        console.log("vay",response);
        this.allUserPosts = response;
      }
    })

  }

}
