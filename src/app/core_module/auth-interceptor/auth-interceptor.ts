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
    console.log("token",token);

    request = request.clone({
        headers: request.headers.set(
          'Authorization', 'Bearer ' + token
        )
    });

    console.log("request",request);

    return next.handle(request);
  }
}
