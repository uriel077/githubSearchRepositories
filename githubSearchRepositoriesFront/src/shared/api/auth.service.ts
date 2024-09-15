import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService
{
    constructor(private http: HttpClient) { }

    /**
     * Login post. 
     */
    public login(): Observable<any>
    {        
        var username = "uriel";
        return (this.http.post<any>(`${environment.apiUrl}Auth/login`, { username:username }));
    }

    /**
     * Logout post. 
     */
    public logout(): Observable<any>
    {        
        return (this.http.post<any>(`${environment.apiUrl}Auth/logout`, ''));
    }
}