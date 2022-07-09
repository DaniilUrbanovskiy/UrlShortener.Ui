import {Component, OnInit} from '@angular/core';
import {UrlShortenerService} from "../../services/url-shortener.service";
import {catchError, finalize} from "rxjs/operators";
import {UrlInterface} from "../../interfaces/url.interface";
import {Router} from "@angular/router";

@Component({
  selector: 'app-url-shortener',
  templateUrl: './url-shortener.component.html',
  styleUrls: ['./url-shortener.component.css']
})
export class UrlShortenerComponent implements OnInit {
  isChecked = false;
  longLink: string = '';
  shortLink: string = '';
  dataUrls: UrlInterface[] = [];
  token: string = '';
  errorMessage: string = '';

  constructor(private urlShortenerService: UrlShortenerService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.errorMessage = " "
    this.getUrls();
    this.token = JSON.stringify(localStorage.getItem('token'));
    console.log(this.token)
  }

  typeShortenedLink() {
    this.errorMessage = " "
    this.isChecked = !this.isChecked;

    if (!this.isChecked) {
      this.shortLink = '';
    }
  }

  getUrls() {
    this.urlShortenerService.getAllUrls()
      .subscribe(res => this.dataUrls = res);
  }

  generateShortUrl() {
    this.errorMessage = " "
    if (!this.isChecked) {
      this.urlShortenerService.generateShortUrl(this.longLink)
        .pipe(catchError((error) => {
          if (error.status === 400) {
            this.errorMessage = 'Wrong url or it already exists in your table';
          }
          return error;
        }),finalize(() => this.getUrls()))
        .subscribe(r => r)
        return;
    }
    if (this.isChecked && this.shortLink !== '') {
      this.urlShortenerService.generateOwnUrl(this.longLink, this.shortLink)
        .pipe(catchError((error) => {
          if (error.status === 400) {
            this.errorMessage = 'Wrong url or it already exists in your table';
          }
          return error;
        }),finalize(() => this.getUrls()))
        .subscribe(r => r)
    }
    else{
      this.errorMessage = 'Enter your own url'
    }
  }

  deleteUrl(shortLink: string) {
    this.errorMessage = " "
    this.urlShortenerService.deleteUrl(shortLink)
      .pipe(finalize(() => this.getUrls()))
      .subscribe(r => r);
  }

  logout() {
    this.errorMessage = " "
    localStorage.removeItem('token');
    this.token = '';
  }
}
