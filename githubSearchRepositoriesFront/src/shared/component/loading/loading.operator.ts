import { Observable, finalize } from 'rxjs';
import { LoadingService } from './loading.service';

/**
 * Add loading operator.
 * @param loadingService The loading sevice.
 */
export function withLoading<T>(loadingService: LoadingService)
{
  return (source: Observable<T>) => 
    new Observable<T>(observer => {
      loadingService.show();
      return source.pipe(
        finalize(() => loadingService.hide())
      ).subscribe(observer);
    }
  );
}