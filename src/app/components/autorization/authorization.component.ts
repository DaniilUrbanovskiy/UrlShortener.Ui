import {Component, OnInit} from '@angular/core';
import {UrlShortenerService} from "../../services/url-shortener.service";
import {catchError, finalize} from "rxjs/operators";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthorizationService} from "../../services/authorization.service";

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.css']
})
export class AuthorizationComponent implements OnInit {
  context: string = 'registration';
  errorMessage: string = '';
  token: string = '';

  userName: string = '';
  userBirthday: string = '';
  userEmail: string = '';
  userLogin: string = '';
  userPassword: string = '';

  constructor(private authorizationService: AuthorizationService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(r => {
      if (r['context'] === 'login') {
        this.context = 'login';
      } else if (r['context'] === 'registration') {
        this.context = 'registration';
      }
      return r;
    });
  }

  changeContext(context: string) {
    this.context = context;
    this.clearForm();
  }

  clearForm() {
    this.userName = '';
    this.userBirthday = '';
    this.userEmail = '';
    this.userLogin = '';
    this.userPassword = '';
    this.errorMessage = '';
  }

  submit() {
    if (this.context === 'registration') {
      this.errorMessage = '';
      this.authorizationService.registerUser({
        Login: this.userLogin,
        Name: this.userName,
        Birthday: this.userBirthday,
        Email: this.userEmail,
        Password: this.userPassword
      }).pipe(catchError((error) => {
          if (error.status === 400) {
            this.errorMessage = 'Incorrect data';
          }
          return error;
        }),
        finalize(() => {
          if (!this.errorMessage) {
            this.context = 'login';
            this.clearForm();
            this.errorMessage = '';
          }
        }))
        .subscribe(res => res);
    }

    if (this.context === 'login') {
      this.errorMessage = '';
      this.authorizationService.loginUser({
        Login: this.userLogin,
        Password: this.userPassword
      }).pipe(catchError(error => {
          if (error.status === 400) {
            this.errorMessage = 'Incorrect data';
          }
          return error;
        }),
        finalize(() => {
          if (!this.errorMessage) {
            this.router.navigate(['shortener']);
          }
        }))
        .subscribe(res => {
          this.token = res.token;
          localStorage.setItem('token', this.token);
          return res.token;
        });
    }
  }
}
