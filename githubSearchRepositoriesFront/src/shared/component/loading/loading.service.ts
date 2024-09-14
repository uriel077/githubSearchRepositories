import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingService
{
    /**
     * Loading subject.
     */
    private loadingSubject  = new BehaviorSubject<boolean>(false);
    public loading$         = this.loadingSubject.asObservable();

    /**
     * Show loading.
     */
    public show() 
    {
      this.loadingSubject.next(true);
    }
  
    /**
     * Hide loading 
     */
    public hide() 
    {
        this.loadingSubject.next(false);
    }
}