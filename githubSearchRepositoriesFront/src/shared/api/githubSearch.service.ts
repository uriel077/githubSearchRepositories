import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GithubSearchService
{
    constructor(private http: HttpClient) { }

    /**
     * Search repositories by keyword.
     * @param keyword Keyword filter.
     * @returns Repositories filter by keyword.
     */
    searchRepositories(keyword: string): Observable<any>
    {
        return this.http.get<any>(`${environment.apiUrl}GithubSearch/search/${keyword}`);
    }
}