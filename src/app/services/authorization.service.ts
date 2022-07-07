import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {NewUserInterface} from "../interfaces/new-user.interface";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {
  api = environment.baseApi;

  constructor(private http: HttpClient) {
  }

  registerUser(userInfo: NewUserInterface) {
    return this.http.post(this.api + `User/registr`, userInfo)
  }

  loginUser(userInfo: NewUserInterface): Observable<any> {
    return this.http.post(this.api + 'User/login', userInfo)
  }
}
