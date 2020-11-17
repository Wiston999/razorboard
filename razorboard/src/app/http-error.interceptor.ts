import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpEventsService } from './http-events.service';

import { ToastrService } from 'ngx-toastr';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(
    public toastr: ToastrService,
    public httpEvents: HttpEventsService,
  ) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError(err => {
        console.error('Error caught on HttpInterceptor', err);
        if (err instanceof ErrorEvent) {
          this.toastr.error(err.error.message, `Client side error`);
        } else if (err.status === 0) {
          this.toastr.error(err.message, 'Generic HTTP error');
          this.httpEvents.statusNotify(0);
        } else {
          this.toastr.error(err.message, `HTTP Error ${err.status}`);
          this.httpEvents.statusNotify(err.status);
        }
        return throwError(err);
      })
    );
  }
}
