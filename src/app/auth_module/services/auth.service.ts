import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {HttpUtils} from '../../core_module/utils/http-utils/http-utils';
import {environment} from "../../../environments/environment";
import jwt_decode from 'jwt-decode';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  static API = 'auth/register';
  apiUrlEndPoint: string = '/auth/register';
  apiUrlEndPoint2: string = '/auth/authenticate';
  apiUrlEndPoint3: string = '/auth';
  baseUrl: string = environment.baseUrl;
  private isAuthenticate = false;

  constructor(
    private httpClient: HttpClient
  ) {}

  protected getApi(): string {
    return AuthService.API;
  }

  registerNewUser(data: any): Observable<any>{
    return this.httpClient.post(this.baseUrl.concat(this.apiUrlEndPoint),data).pipe(
      map((res: any)=>{
        if(res){
          console.log("hh",res);
        }
      }));
  }

  loginUser(data: any): Observable<any>{
    return this.httpClient.post(this.baseUrl.concat(this.apiUrlEndPoint2),data).pipe(
      map((res: any)=>{
        if(res){
          console.log("resiiii",res);
          let a: any;
          a = jwt_decode(res?.token);
          localStorage.setItem('role',a?.role[0]?.authority);
          localStorage.setItem('token',res?.token);
          this.isAuthenticate = true;
          return res;
        }
      })
    );
  }

  resetPassword(data: any): Observable<any>{
    return this.httpClient.post(this.baseUrl.concat("/user/reset-password"),data).pipe(
      map((res: any)=>{
        if(res){
          return res;
        }
      })
    );
  }

  onForgotPassword(email: string) {
    return this.httpClient.post(this.baseUrl.concat(this.apiUrlEndPoint3.concat('/email/forgot-password')),email).pipe(
      map((res: any)=>{
        if(res){
          return res;
        }
      })
    );
  }

  getUser(data: any) {
    return this.httpClient.post(this.baseUrl.concat(this.apiUrlEndPoint2),data).pipe(
      map((res: any)=>{
        if(res){
          return res;
        }
      })
    );
  }

  onSignOut() {
    return this.isAuthenticate = false;
    // return this.auth.signOut();
  }

  sendVerificationEmailLink(user: any) {
    return user.sendEmailVerification();
  }

  saveUserDetailsOnRegisterUser(data: any): Observable<any> {
    const api = `${this.getApi()}`;
    const req = HttpUtils.getRequest(api);
    return this.httpClient.post(req.url, data);
  }

  isAuthenticated(): boolean {
    return this.isAuthenticate;
  }

  onVerifyOTP(otp: any) {
    return this.httpClient.post(this.baseUrl.concat(this.apiUrlEndPoint3.concat('/verify-otp')),otp).pipe(
      map((res: any)=>{
        if(res){
          return res;
        }
      })
    );
  }


  // getSavedUserDetailsById(uid: any): Observable<any> {
  //   const dbRef = this.firebase.database.ref('users');
  //   return Observable.create((observer: any) => {
  //     const callback = dbRef.orderByChild("uid")
  //       .equalTo(uid)
  //       .on('child_added', (snap:any) => {
  //         console.log('sadfasdf: ', snap);
  //         observer.next(snap.val());
  //       }, (error:any) => observer.error(error));
  //     return () => dbRef.off('child_added', callback);
  //   });
  // }
}
