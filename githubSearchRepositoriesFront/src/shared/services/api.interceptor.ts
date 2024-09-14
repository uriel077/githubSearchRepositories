import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';

import * as consts from '../environments/consts';

@Injectable()
export class ApiInterceptor implements HttpInterceptor
{
    constructor() { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>
    {
        let apiRequest: HttpRequest<any> = request.clone({ withCredentials: true });

        //const token = this.authService.getToken();
        //const token = this.getCookie('AuthCookie');
        const token = sessionStorage.getItem(consts.accessTokenKey);
        
        if (token)
        {
            const clonedReq  = request.clone({
                setHeaders: {
                Authorization: `Bearer ${token}`
                }
            });

            return next.handle(clonedReq);
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
        if (err.status) 
        { 
            // If the authentication failed. 
            if (err.status === consts.HttpCodes.Unauthorized) 
            {
                console.warn('unauthorized');
            } 
        } 
 
        return (throwError(err)); 
    }
}
