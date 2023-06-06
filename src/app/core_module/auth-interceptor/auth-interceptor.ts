import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (request.url.includes('/auth')) {
      return next.handle(request);
    }
    const token = localStorage.getItem('token');
    console.log("k xa",token);


    const authReq = request.clone({
      // setHeaders: {
      //   Authorization: `Bearer ${token}`
      // }
      headers: request.headers.set(
        'Authorization', 'Bearer ' + token
      )
    });

    console.log("hahha",authReq);

    return next.handle(authReq);
  }
}
