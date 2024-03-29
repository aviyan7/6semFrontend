import { Injectable } from '@angular/core';
import {HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private toastr: ToastrService,
    private router: Router
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (request.url.includes('/auth')) {
      return next.handle(request);
    }
    const token = localStorage.getItem('token');
    console.log("token", token);
    if (token) {
      const tokenExpiration = new Date(0);
      tokenExpiration.setUTCSeconds(JSON.parse(atob(token.split('.')[1])).exp);
      if (tokenExpiration < new Date()) {
        this.toastr.error("Token Expired !!!");
        console.log(localStorage);
        localStorage.clear();
        this.router.navigate(['/login']);
        return next.handle(request);
      }
    }

    request = request.clone({
      headers: request.headers.set(
        'Authorization', 'Bearer ' + token
      )
    });

    console.log("request", request);
  return next.handle(request);
  }
}
