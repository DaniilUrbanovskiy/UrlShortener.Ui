import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {UrlInterface} from "../interfaces/url.interface";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UrlShortenerService {
  api = environment.baseApi;

  constructor(private http: HttpClient) {
  }

  generateShortUrl(longUrl: string) {
    return this.http.post(
      this.api + `Shortened/SetAuto?url=${longUrl}`, {})
  }

  generateOwnUrl(longUrl: string, shortUrl: string) {
    return this.http.post(
      this.api + `Shortened/SetByYourself?url=${longUrl}&shortUrl=${shortUrl}`, {})
  }

  getAllUrls(): Observable<UrlInterface[]> {
    return this.http.get<UrlInterface[]>(
      this.api + `shortened/GetUrls`)
  }

  deleteUrl(shortUrl: string) {
    return this.http.delete(
      this.api + `Shortened/RemoveUrl?shortUrl=${shortUrl}`)
  }
}
