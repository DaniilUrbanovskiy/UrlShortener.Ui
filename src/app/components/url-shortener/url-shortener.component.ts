import {Component, OnInit} from '@angular/core';
import {UrlShortenerService} from "../../services/url-shortener.service";
import {finalize} from "rxjs/operators";
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

  constructor(private urlShortenerService: UrlShortenerService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.getUrls();
  }

  typeShortenedLink() {
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
    if (!this.isChecked) {
      this.urlShortenerService.generateShortUrl(this.longLink)
        .pipe(finalize(() => this.getUrls()))
        .subscribe(r => r)
    }
    if (this.isChecked && this.shortLink !== '') {
      this.urlShortenerService.generateOwnUrl(this.longLink, this.shortLink)
        .pipe(finalize(() => this.getUrls()))
        .subscribe(r => r)
    }
  }

  deleteUrl(shortLink: string) {
    this.urlShortenerService.deleteUrl(shortLink)
      .pipe(finalize(() => this.getUrls()))
      .subscribe(r => r);
  }
}
