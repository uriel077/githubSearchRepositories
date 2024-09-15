import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatListModule } from '@angular/material/list';
import { MatIcon } from '@angular/material/icon';
import { MatToolbar } from '@angular/material/toolbar';
import { CommonModule } from '@angular/common';
import { MatTooltip } from '@angular/material/tooltip';

import { LoadingComponent } from 'src/shared/component/loading/loading.component';


@Component({
  changeDetection:  ChangeDetectionStrategy.OnPush,
  selector:         'app-root',
  standalone:       true,
  imports:          [RouterOutlet, MatButtonToggleModule, MatListModule, MatIcon, MatToolbar, CommonModule, LoadingComponent, MatTooltip],
  templateUrl:      './app.component.html',
  styleUrl:         './app.component.scss'
})
export class AppComponent {

    /**
     * Simple toggle menu.
     */
    public menuOpen: boolean  = false;

    constructor(private router: Router) {}
    
    /**
     * Navigate to the route.
     * @param route The desire route.
     */
    public navigate(route: string): void
    {     
        this.router.navigate([route]);
    }

    /**
     * Togggle the menu.
     */
    public toggleMenu(): void
    {
        this.menuOpen = !this.menuOpen;
    }
}
