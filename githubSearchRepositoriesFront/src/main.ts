import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient, HTTP_INTERCEPTORS, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import { provideRouter, Route } from '@angular/router';

import { ApiInterceptor } from './shared/services/api.interceptor';
import { GithubSearchComponent } from './app/components/github-search/github-search.component';
import { LoginComponent } from './app/components/login/login.component';
import { AppComponent } from './app/app.component';
import { BookmarksComponent } from './app/components/bookmarks/bookmarks.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';


const routes: Route[] = [
  { path: '', component: LoginComponent},
  { path: 'githubSearch', component: GithubSearchComponent },
  { path: 'bookmarks', component: BookmarksComponent },
];

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(
      withInterceptorsFromDi()
    ),
    provideRouter(routes),
    { provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true },
    provideAnimationsAsync(),
    provideAnimationsAsync()
  ]
}).catch(err => console.error(err));