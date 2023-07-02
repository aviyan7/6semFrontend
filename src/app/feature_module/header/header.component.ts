import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../auth_module/services/auth.service';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  userDetails: any;

  constructor(
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getUserDetails();
  }

  getUserDetails() {
    // this.authService.getUser().subscribe((user: any) => {
    //   console.log('User is: ', user);
    //
    //   this.userDetails = user?.email;
    // });
  }

  openProfile() {
  }

  onLogout() {
    // this.authService.onSignOut().then(() => {
    //   this.toastr.success("Sign Out Successfully !", "Success");
    //   this.router.navigate(['/auth/login']);
    // }, (error: any) => {
    //   this.toastr.error("Something went wrong, unable to sign out !", "Error Occurs");
    // });
    localStorage.clear();
    this.router.navigate(['/']);
  }

  onUserProfile(){
    this.router.navigate(['/home/user-profile']);
  }

  onCreateNewPost() {
    this.router.navigate(['/home/create-new-post']);
  }

  onCreateNewSubGroup(){
    this.router.navigate(['/home/group']);
    // this.router.navigate(['/home/create-new-subGroup']);
  }
}
