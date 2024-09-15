import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinner } from '@angular/material/progress-spinner';


import { LoadingService } from './loading.service';
import { Observable } from 'rxjs';

@Component({
  changeDetection:  ChangeDetectionStrategy.OnPush,
  selector:         'app-loading',
  standalone:       true,
  imports:          [CommonModule, MatProgressSpinner],
  templateUrl:      './loading.component.html',
})
export class LoadingComponent
{
    /**
     * Is loading async.
     */
    public loading$: Observable<boolean> = this.loadingService.loading$;

    constructor(private loadingService: LoadingService) {}
}