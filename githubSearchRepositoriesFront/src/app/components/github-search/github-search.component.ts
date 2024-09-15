import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Injector, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';

import { GithubSearchService } from 'src/shared/api/githubSearch.service';
import { BookmarkService } from 'src/shared/services/bookmark.service';
import { LocalStorageService } from 'src/shared/services/localStorage.service';
import { ComponentBase } from 'src/shared/base/component.base';


@Component({
  changeDetection:  ChangeDetectionStrategy.OnPush,
  selector:         'app-github-search',
  standalone:       true,
  imports:          [CommonModule, FormsModule, HttpClientModule, MatIcon, MatTooltip],
  templateUrl:      './github-search.component.html',
  styleUrls:        ['./github-search.component.scss'],
})
export class GithubSearchComponent extends ComponentBase implements OnInit
{
    /**
     * The search keyword.
     */
    public searchKeyword: string                            = '';

    /**
     * The list of repositories.
     */
    public repositories: any[]                              = [];

    /**
     * Dictionary for the bookmarked repositories.
     */
    public bookmarkedRepositories: { [key: number]: any }   = {};

    /**
     * Github search loacal storage key.
     */
    private githubSearchLocalStorageKey = 'githubSearchLocalStorageKey';

    constructor(
        injector: Injector,
        private githubSearchService: GithubSearchService,
        private bookmarkService: BookmarkService,
        private localStorageService: LocalStorageService,
    ) {
        super(injector);
    }

    /**
     * Initializes the component.
     */
    protected override initData(onInit: boolean): void
    {
        var savedRepositories = JSON.parse(this.localStorageService.getValue(this.githubSearchLocalStorageKey));

        if (savedRepositories)
        {
            this.repositories   = savedRepositories.repositories;
            this.searchKeyword  = savedRepositories.searchKeyword;
        }

        this.initBookmarkDict();
    }

    /**
     * Search the keyword in github
     */
    public search(): void
    {
        this.githubSearchService
            .searchRepositories(this.searchKeyword)
            .pipe(this.unsubscribeLoadingPipe())
            .subscribe(
                {
                    next: data =>
                        {
                            this.repositories = data;
                            this.saveSearchToLocalStorage(this.searchKeyword, this.repositories);
                            this.initBookmarkDict();
                        }
                }
            );
    }

    /**
     * Save search to local storage.
     * @param searchKeyword 
     * @param repositories 
     */
    private saveSearchToLocalStorage(searchKeyword: string, repositories: any[]): void
    {
        const dataValue = {
            repositories: repositories,
            searchKeyword: searchKeyword,
        }

        this.localStorageService.setValue(this.githubSearchLocalStorageKey, JSON.stringify(dataValue));
    }

    /**
     * Init bookmark dict.
     */
    private initBookmarkDict(): void
    {
        this.bookmarkedRepositories = this.bookmarkService
                                            .getBookmarks()
                                            .reduce((acc, obj) => {
                                                acc[obj.id] = obj;
                                                return (acc);
                                            }, 
                                            {}
                                        );
    }

    /**
     * Bookmark or unbookmark depend on the value.
     * @param repo The repositories.
     * @param value The value identify which action to do.
     */
    public bookmark(repo: any, value: boolean): void
    {
        if (value)
        {
            this.bookmarkService.addBookmark(repo);
        }
        else
        {
            this.bookmarkService.removeBookmark(repo.id);
        }

        this.initBookmarkDict();
    }
}
