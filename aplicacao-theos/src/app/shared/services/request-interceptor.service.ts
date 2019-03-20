import { Injectable } from '@angular/core';
// tslint:disable-next-line:max-line-length
import { HttpInterceptor, HttpRequest, HttpHandler, HttpSentEvent, HttpHeaderResponse, HttpProgressEvent, HttpResponse, HttpUserEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoaderService } from '../loader/loader.service';
import { catchError, finalize } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class RequestInterceptorService implements HttpInterceptor {
    constructor(
        private loader: LoaderService,
        private router: Router,
    ) { }

    addToken(req: HttpRequest<any>): HttpRequest<any> {
        return req.clone(
            {
                setHeaders: {},
            });
    }
    // tslint:disable-next-line:max-line-length
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any>> {
        this.showLoader();
        return next.handle(this.addToken(req)).pipe(
            catchError(err => {
                if (err instanceof HttpErrorResponse) {
                    // this.loader.hide();
                    switch ((err as HttpErrorResponse).status) {
                        case 401:
                        // return this.handle401Error(error, req);
                        case 403:
                        // return this.handle403Error(error);
                        case 500:
                            return this.handle403Error(err);
                        default:
                            return this.handleErrorDefault(err);

                    }
                } else {
                    return Observable.throw(err);
                }
            }), finalize(() => {
                this.onEnd();
            }));
    }


    private onEnd(): void {
        this.hideLoader();
    }
    private showLoader(): void {
        this.loader.show();
    }
    private hideLoader(): void {
        this.loader.hide();
    }

    handle403Error(error: HttpErrorResponse) {
        localStorage.clear();
        return Observable.throw(error);
    }


    handleErrorDefault(error: HttpErrorResponse) {
        if (error.status === 0) {
            return throwError(error.status);
        } else if (error.status) {
            return throwError(error.status);
        } else {
            return throwError(error);
        }
    }

}
