import {Injectable} from '@angular/core';
// import {AngularFireAuth} from '@angular/fire/compat/auth';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {HttpUtils} from '../../core_module/utils/http-utils/http-utils';
import {logMessages} from "@angular-devkit/build-angular/src/builders/browser-esbuild/esbuild";
// import {AngularFireDatabase} from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  static API = 'users';

  constructor(
    // private auth: AngularFireAuth,
    private httpClient: HttpClient,
    // private firebase: AngularFireDatabase
  ) {}

  protected getApi(): string {
    return AuthService.API;
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

  getUser() {
    // return this.auth.authState;
  }

  onSignOut() {
    return console.log('hello');
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
