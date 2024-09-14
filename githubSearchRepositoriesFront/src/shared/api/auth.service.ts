import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AppConfig } from '../enviorement/AppConfig';

@Injectable({
  providedIn: 'root'
})
export class AuthService
{
    constructor(private http: HttpClient) { }

    /**
     * Login post. 
     */
    login(): Observable<any>
    {        
        var username = "uriel";
        return (this.http.post<any>(`${AppConfig.ApiUrlBase}Auth/login`, { username:username }));
    }

    /**
     * Logout post. 
     */
    logout(): Observable<any>
    {        
        return (this.http.post<any>(`${AppConfig.ApiUrlBase}Auth/logout`, ''));
    }
}