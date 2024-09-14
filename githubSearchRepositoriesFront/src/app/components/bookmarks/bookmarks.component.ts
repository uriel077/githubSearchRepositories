import { ChangeDetectionStrategy, Component, Injector, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookmarkService } from '../../../shared/services/bookmark.service';
import { ComponentBase } from '../../../shared/base/component.base';

@Component({
  changeDetection:  ChangeDetectionStrategy.OnPush,
  selector:         'app-bookmarks',
  standalone:       true,
  imports:          [CommonModule ],
  templateUrl:      './bookmarks.component.html',
  styleUrls:        ['./bookmarks.component.scss'],
})
export class BookmarksComponent extends ComponentBase implements OnInit
{
    /**
     * List of bookmarks.
     */
    public bookmarks: any[] = [];

    constructor( 
            injector: Injector,
            private bookmarkService: BookmarkService
    ) {
        super(injector);
    }

    /**
     * Initializes the component.
     */
    protected override initData(onInit: boolean): void
    {
        this.bookmarks = this.bookmarkService.getBookmarks();
    }

    /**
     * Remove bookmark by repo id.
     * @param repoId The unique id of the repo.
     */
    public removeBookmark(repoId: number): void
    {
        this.bookmarkService.removeBookmark(repoId);
        this.bookmarks = this.bookmarkService.getBookmarks();
    }
}