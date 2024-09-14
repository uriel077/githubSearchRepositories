import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AppConfig } from '../enviorement/AppConfig';

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
        return this.http.get<any>(`${AppConfig.ApiUrlBase}GithubSearch/search/${keyword}`);
    }
}