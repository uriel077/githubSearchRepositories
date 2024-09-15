import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingService
{
    /**
     * Loading subject.
     */
    private loadingSubject: BehaviorSubject<boolean>    = new BehaviorSubject<boolean>(false);

    /**
     * Loading Observable.
     */
    public loading$: Observable<boolean>                = this.loadingSubject.asObservable();

    /**
     * Show loading.
     */
    public show(): void
    {
        this.loadingSubject.next(true);
    }
  
    /**
     * Hide loading 
     */
    public hide(): void
    {
        this.loadingSubject.next(false);
    }
}