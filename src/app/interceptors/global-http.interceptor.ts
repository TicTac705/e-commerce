import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpResponse, HttpErrorResponse
} from '@angular/common/http';
import {Observable, tap} from 'rxjs';

import {AuthService} from "../services/api/auth.service";
import {Router} from "@angular/router";
import {LoaderService} from "../services/loader.service";

@Injectable()
export class GlobalHttpInterceptor implements HttpInterceptor {
  private totalRequests = 0;

  constructor(
    private router: Router,
    private authService: AuthService,
    private loaderService: LoaderService
  ) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.totalRequests++;
    this.loaderService.setLoading(true);
    return next.handle(request).pipe(
      tap({
          next: (event) => {
            if (event instanceof HttpResponse)
              console.log('Server response');
          },
          error: (error) => {
            if (error instanceof HttpErrorResponse) {
              if (error.status === 0) {
                console.error('An error occurred:', error.error);
              } else if (error.status == 401) {
                console.error('Http status:', error.status, 'Unauthorized');
                this.authService.clear();
                this.router.navigate(['/sign-in',]).then();
              } else if (error.status == 444) {
                console.error('Http status:', error.status, error.error);
              } else {
                console.error(`Backend returned code ${error.status}, body was: `, error.error);
              }
            }

            // TODO need add notification with 'error.error.message'
          },
          finalize: (() => {
            this.totalRequests--;
            if (this.totalRequests == 0) {
              this.loaderService.setLoading(false);
            }
          })
        }
      )
    );
  }
}
