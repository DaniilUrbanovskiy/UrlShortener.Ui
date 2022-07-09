import {Routes} from "@angular/router";
import {AuthorizationComponent} from "./components/autorization/authorization.component";
import {UrlShortenerComponent} from "./components/url-shortener/url-shortener.component";
import {AboutComponent} from "./components/about/about.component";

export const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: '/authorization/login'},
  {path: 'authorization/:login', component: AuthorizationComponent},
  {path: 'authorization/registration', component: AuthorizationComponent},
  {path: 'shortener', component: UrlShortenerComponent},
  {path: 'about', component: AboutComponent},
  {path: '**', redirectTo: '/authorization/:login'}
]
