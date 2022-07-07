import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {AuthorizationComponent} from './components/autorization/authorization.component';
import {RouterModule} from "@angular/router";
import {routes} from "./app-routing.module";
import {UrlShortenerComponent} from './components/url-shortener/url-shortener.component';
import {FormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AboutComponent} from './components/about/about.component';
import {AuthInterceptor} from "./interceptors/authorization.interceptor";
import {MatTooltipModule} from '@angular/material/tooltip';

@NgModule({
  declarations: [
    AppComponent,
    AuthorizationComponent,
    UrlShortenerComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    [RouterModule.forRoot(routes)],
    FormsModule,
    HttpClientModule,
    MatTooltipModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
