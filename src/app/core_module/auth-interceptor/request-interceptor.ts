import {
  HttpInterceptor,
  HttpClient,
  HttpBackend,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
  HttpResponse,
} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {
  Observable,
  catchError,
  throwError,
  tap
} from 'rxjs';
import {LoaderService} from '../services/loader.service';
import {AuthService} from '../../auth_module/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class RequestInterceptor implements HttpInterceptor {
  private requests: HttpRequest<any>[] = [];

  constructor(
    private httpClient: HttpClient,
    private httpBackend: HttpBackend,
    private router: Router,
    private loaderService: LoaderService,
    private authService: AuthService
  ) {
    this.httpClient = new HttpClient(httpBackend);
  }

  removeRequest(req: HttpRequest<any>) {
    const i = this.requests.indexOf(req);
    if (i >= 0) {
      this.requests.splice(i, 1);
    }
    this.loaderService.status.next(this.requests.length > 0);
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.requests.push(req);
    this.loaderService.status.next(true);

    return next.handle(req).pipe(
      tap((event: any) => {
        if (event instanceof HttpResponse) {
          console.log('sdfsdfsdf:');
          this.removeRequest(req);
        }
      }),
      catchError((error) => {
        if (error instanceof HttpErrorResponse && error.status === 401) {
          this.removeRequest(req);
          // this.authService.onSignOut().then();
          return throwError(() => error);
        }
        return throwError(() => error);
      })
    );
  }
}
