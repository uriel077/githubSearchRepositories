import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatListModule } from '@angular/material/list';
import { MatIcon } from '@angular/material/icon';
import { MatToolbar } from '@angular/material/toolbar';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from '../shared/component/loading/loading.component';


@Component({
  changeDetection:  ChangeDetectionStrategy.OnPush,
  selector:         'app-root',
  standalone:       true,
  imports:          [RouterOutlet, MatButtonToggleModule, MatListModule, MatIcon, MatToolbar, CommonModule, LoadingComponent],
  templateUrl:      './app.component.html',
  styleUrl:         './app.component.scss'
})
export class AppComponent {

    /**
     * Simple toggle menu.
     */
    public menuOpen  = false;

    constructor(
        private router: Router,
      ) {}
    
    /**
     * Navigate to the route.
     * @param route The desire route.
     */
    public navigate(route: string)
    {     
      this.router.navigate([route]);
    }

    /**
     * Togggle the menu.
     */
    public toggleMenu()
    {
      this.menuOpen = !this.menuOpen;
    }
}
