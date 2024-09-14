import { ChangeDetectorRef, Directive, Injector, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import * as consts from '../environments/consts';

import { withLoading } from '../component/loading/loading.operator';
import { LoadingService } from '../component/loading/loading.service';

/**
 * The number of debounce milliseconds for the loader.
 */
const DEBOUNCE_DELAY = 150;

/**
 * Base class for all components.
 */
@Directive({})
export abstract class ComponentBase implements OnInit, OnDestroy
{

    /**
     * The change detector.
     */
    public readonly cdr: ChangeDetectorRef;

    /**
     * The base class's router.
     */
    public readonly router: Router;

    /**
     * The service loading.
     */
    public readonly loadingService: LoadingService;

    constructor(protected readonly baseInjector: Injector)
    {
        this.cdr            = this.baseInjector.get(ChangeDetectorRef);
        this.router         = this.baseInjector.get(Router);
        this.loadingService = this.baseInjector.get(LoadingService);

    }

    /**
     * Initialize the component's data and login event subscription.
     */
    public ngOnInit(): void
    {
        this.execInitData(true);
    }

    /**
     * Removes the login event subscription.
     */
    public ngOnDestroy(): void
    {
        // If extended component implement a destroy function, run it.
        if (this.onDestroy)
        {
            this.onDestroy();
        }
    }

    /**
     * Pipes the finalize sequence for component observable subscriptions.
     * @param action An action to invoke on finalization of the subscription (optional).
     */
    public unsubscribeLoadingPipe<T>(action?: () => void): (source: Observable<T>) => Observable<T>
    {
        return (
            (source: Observable<T>) =>
                source.pipe(
                    withLoading(this.loadingService),
                    finalize(
                        () =>
                        {
                            // If an action was given, execute it.
                            if (action)
                            {
                                action();
                            }

                            // Initiate stop loading on subscription finalize.
                            this.onFinalize();
                        },
                    ),
                ));
    }

    /**
     * Default finalize subscription action.
     */
    public onFinalize(): void
    {
        this.stopLoading();
        
        this.cdr.markForCheck();
    }

    /**
     * Requests to initiate the data on component initiation or relogin.
     * @param onInit Whether the function was invoked due to component initialization or not.
     */
    protected abstract initData(onInit: boolean): void;

    /**
     * Function to be run when component is being destroyed.
     */
    protected onDestroy?(): void;

    /**
     * Starts the loading loader.
     * @param callback A callback to run after loading has started.
     */
    public startLoading(callback?: () => void): void
    {
        if (callback)
        {
            setTimeout(
                () =>
                {
                    callback();

                    this.cdr.markForCheck();
                }
            );
        }
    }

    /**
     * Stops the loading loader.
     * @param callback A callback to run after loading has stopped.
     */
    public stopLoading(callback?: () => void): void
    {
        this.cdr.markForCheck();

        setTimeout(
            () =>
            {
                this.cdr.markForCheck();

                if (callback)
                {
                    setTimeout(
                        () =>
                        {
                            callback();

                            this.cdr.markForCheck();
                        }
                    );
                }
            },
            DEBOUNCE_DELAY);
    }

    /**
     * Verify user is authorized to view page by default returns false.
     */
    protected isAuthorized(): boolean
    {
        const accessToken = sessionStorage?.getItem(consts.accessTokenKey);

        return ( accessToken !== null && accessToken !== '');
    }

    /**
     * Redirects the user to default page and toasts unauthorized error message.
     */
    protected handleUnauthorizedPage(): void
    {
        this.stopLoading();
        console.warn('Does not have permission');
        this.router.navigate(['/']).catch(err => console.error('Couldn\'t navigate', err));
    }

    /**
     * Check user authorization before loading a page and init data or redirect to default state.
     * @param onInit Parameter to pass to initData.
     */
    protected execInitData(onInit: boolean): void
    {
        if (this.isAuthorized())
        {
            setTimeout(
                () =>
                {
                    this.initData(onInit);

                    this.cdr.markForCheck();
                });
        }
        else
        {
            this.handleUnauthorizedPage();
        }
    }
}
