import {Routes} from "@angular/router";
import {AuthorizationComponent} from "./components/autorization/authorization.component";
import {UrlShortenerComponent} from "./components/url-shortener/url-shortener.component";
import {AboutComponent} from "./components/about/about.component";

export const routes: Routes = [
  {path: 'authorization', component: AuthorizationComponent},
  {path: 'authorization/:context', component: AuthorizationComponent},
  {path: 'shortener', component: UrlShortenerComponent},
  {path: 'about', component: AboutComponent},
]
