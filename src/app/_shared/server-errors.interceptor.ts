import { environment, messages } from './../../environments/environment';
import { MatSnackBar } from '@angular/material';
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse } from '@angular/common/http';
import { Observable, EMPTY } from 'rxjs';
import { tap, catchError, retry } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ServerErrorsInterceptor implements HttpInterceptor {

    constructor(private snackBar: MatSnackBar) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(retry(environment.RETRY_REQUEST)).
            pipe(tap(event => {
                if (event instanceof HttpResponse) {                    
                    if (event.body && event.body.error === true && event.body.errorMessage) {
                        throw new Error(event.body.errorMessage);
                    }
                }
            })).pipe(catchError((err) => {
                //console.log(err);
                //https://en.wikipedia.org/wiki/List_of_HTTP_status_codes
                if (err.status === 400 && err.error.message && err.error.details) {
                    this.snackBar.open(err.error.message+' - '+err.error.details, messages.ERROR_TITLE, { duration: 5000 });                    
                }
                else if (err.status === 401) {
                    this.snackBar.open(err.message, messages.ERROR_TITLE, { duration: 5000 });
                    //this.router.navigate(['/login']);
                }
                else if (err.status === 404 && err.error.message ) {
                    this.snackBar.open(err.error.message, messages.ERROR_TITLE, { duration: 5000 });
                }
                else if (err.error.message && err.error.details) {
                    this.snackBar.open(err.error.message+' - '+err.error.details, messages.ERROR_TITLE, { duration: 5000 });
                } 
                else {
                    this.snackBar.open(err.message, messages.ERROR_TITLE, { duration: 5000 });
                }
                return EMPTY;
            }));
    }
}