import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Injector, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatIcon } from '@angular/material/icon';

import * as consts from '../../../shared/enviorement/consts';

import { AuthService } from '../../../shared/api/auth.service';
import { ComponentBase } from '../../../shared/base/component.base';

@Component({
  changeDetection:  ChangeDetectionStrategy.OnPush,
  selector:         'app-Login',
  standalone:       true,
  imports:          [CommonModule, FormsModule, HttpClientModule, MatIcon],
  templateUrl:      './Login.component.html',
  styleUrls:        ['./Login.component.scss'],
})
export class LoginComponent extends ComponentBase
{
    /**
     * If this is login mode.
     */
    public isLogin: boolean = false;

    constructor(
        injector: Injector,
        private authService: AuthService
    )
    {
        super(injector);
    }

    public override ngOnInit(): void
    {
        const accessToken = sessionStorage.getItem(consts.accessTokenKey) ?? '';

        this.isLogin = accessToken === '';
    }

    protected override initData(onInit: boolean): void
    {
    }

    /**
     * The login for the app.
     */
    public login()
    {
        this.authService
            .login()
            .pipe(this.unsubscribeLoadingPipe())
            .subscribe(response => {               
                sessionStorage.setItem(consts.accessTokenKey, response.token);
                this.isLogin = false;
                this.router.navigate(['/githubSearch']);
            }
        );
    }

    /**
     * The logout for the app.
     */
    public logout()
    {
        this.authService
            .logout()
            .pipe(this.unsubscribeLoadingPipe())
            .subscribe(response => {                
                sessionStorage.removeItem(consts.accessTokenKey );
                this.isLogin = true;
                this.router.navigate(['/']);
            }
        );
    }
}
