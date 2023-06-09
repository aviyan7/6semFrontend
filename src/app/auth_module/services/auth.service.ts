import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {HttpUtils} from '../../core_module/utils/http-utils/http-utils';
import {logMessages} from "@angular-devkit/build-angular/src/builders/browser-esbuild/esbuild";
import {environment} from "../../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  static API = 'auth/register';
  apiUrlEndPoint: string = '/auth/register';
  apiUrlEndPoint2: string = '/auth/authenticate';
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
          this.isAuthenticate = true;
          return res;
        }
      })
    );
  }

  onSignUp(email: string, password: string) {
    // return this.auth.createUserWithEmailAndPassword(email, password);
  }

  onSignIn(email: string, password: string) {
    // return this.auth.signInWithEmailAndPassword(email, password);
  }

  onForgotPassword(email: string) {
    // return this.auth.sendPasswordResetEmail(email);
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
