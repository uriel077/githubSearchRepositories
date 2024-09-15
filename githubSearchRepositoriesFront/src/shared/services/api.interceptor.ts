import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, Observable, tap, throwError } from 'rxjs';

import * as consts from '../config/consts';
import { isNumber } from '../config/helper';

@Injectable()
export class ApiInterceptor implements HttpInterceptor
{
    constructor(protected readonly router: Router) { }

    /**
     * Intercepts the request to handle it.
     * @param request The request to intercept.
     * @param next The handler to continue the request with.
     */
    public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>
    {
        let apiRequest: HttpRequest<any>    = request.clone({ withCredentials: true });

        const token                         = sessionStorage.getItem(consts.accessTokenKey);
        
        if (token)
        {
            const clonedReq  = request.clone({
                setHeaders: {
                Authorization: `Bearer ${token}`
                }
            });

            return (next.handle(clonedReq)
                .pipe( 
                    tap(this.interceptResponse.bind(this)), 
                    catchError((err: any, caught: Observable<any>) => this.catchRequestError(err, caught, apiRequest, next)), 
                )
            );
        }
       
        return (next.handle(apiRequest) 
            .pipe( 
                tap(this.interceptResponse.bind(this)), 
                catchError((err: any, caught: Observable<any>) => this.catchRequestError(err, caught, apiRequest, next)), 
            )
        ); 

    }

    /** 
     * Process and handle response. 
     * @param response The response to process. 
     */ 
    private interceptResponse(response: HttpResponse<any> | any): void 
    {
        // If a JWT token was set, update the credential's data. 
        if (response && 
            response.headers && 
            response.headers.get(consts.HEADERS_JWT)) 
        {
            sessionStorage.setItem(consts.accessTokenKey, JSON.stringify(response.headers.get(consts.HEADERS_JWT)));
        } 
    }

    /** 
     * Process and handle request errors and emit relevant events. 
     * @param err The request error to process. 
     */ 
    protected catchRequestError(err: HttpResponse<any> | any, caught: Observable<any>, apiReq: HttpRequest<any>, next: HttpHandler): Observable<any> 
    {
        // If the rejection has a status, handle it. 
        if (isNumber(err.status))
        {            
            // If the authentication failed. 
            if (err.status === consts.HttpCodes.Null) 
            {
                sessionStorage.removeItem(consts.accessTokenKey);
                console.warn('unauthorized');
                this.router.navigate(['/']).catch(err => console.error('Couldn\'t navigate', err));
            }

            // If the authentication failed. 
            if (err.status === consts.HttpCodes.Unauthorized) 
            {
                sessionStorage.removeItem(consts.accessTokenKey);
                console.warn('unauthorized');
                this.router.navigate(['/']).catch(err => console.error('Couldn\'t navigate', err));
            } 
        } 
 
        return (throwError(err)); 
    }
}
