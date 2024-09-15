import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BookmarkService {

    /**
     * Bookmark storage key.
     */
    private bookmarkStorageKey = 'bookmarkedRepositories';

    constructor() { }

    /**
     * Get bookmarks list.
     * @returns Return list of bookmarks.
     */
    public getBookmarks(): any[]
    {
        const bookmarks = sessionStorage.getItem(this.bookmarkStorageKey);

        return (bookmarks ? JSON.parse(bookmarks) : []);
    }

    /**
     * Add bookmark to session storage.
     * @param repo Repo object.
     */
    public addBookmark(repo: any): void
    {
        const bookmarks = this.getBookmarks();
        bookmarks.push(repo);
        sessionStorage.setItem(this.bookmarkStorageKey, JSON.stringify(bookmarks));
    }

    /**
     * Remove bookmark by repo id.
     * @param repoId Unique repo id.
     */
    public removeBookmark(repoId: number): void
    {
        let bookmarks = this.getBookmarks();
        bookmarks     = bookmarks.filter((repo: any) => repo.id !== repoId);

        sessionStorage.setItem(this.bookmarkStorageKey, JSON.stringify(bookmarks));
    }
}