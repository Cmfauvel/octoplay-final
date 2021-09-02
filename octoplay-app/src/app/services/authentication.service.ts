import { Injectable, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { User } from '../_models/user';
import { AlertService } from 'src/app/services/alert.service';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  public currentUserSubject : Subject<User> = new Subject();
  baseUrl = `${environment.apiUrl}`;
  constructor(
    private http: HttpClient,
    private alertService: AlertService,
    private router: Router,
    private cookie: CookieService
  ) {
  }

  getUserId() {
    try {
      const helper = new JwtHelperService();
      const decodedToken = helper.decodeToken(this.getToken());
      console.log(decodedToken)
      const id = decodedToken.id;
      return id;
    } catch(error) {
      console.log("__Error handled gracefully : ", error.name)
    }
  }

  getUserRole(){
    const helper = new JwtHelperService();
      const decodedToken = helper.decodeToken(this.getToken());
      const role = decodedToken.role;
      return role;
  }

  getToken() {
    const token = localStorage.getItem('token')
    if (token) {
      return token;
    }
  }

  findUserById() {
    const id = this.getUserId();
    this.http.get<any>(this.baseUrl + '/users/' + id).subscribe((resp) => {
      this.currentUserSubject.next(resp);
    })
  }
  register(newUser: User) {
    return this.http.post<any>(this.baseUrl + '/auth/register', newUser)
  }

  findUserByMail(mail) {
    return this.http.get<User>(this.baseUrl + '/users/mail/' + mail)
  }

  public logIn(userConnected: User) {
   return this.http.post<any>(this.baseUrl + `/auth/login`, userConnected)
  }


  public logOut() {
    localStorage.removeItem('token')
    this.http
      .get<any>(`http://localhost:3000/api/v1/auth/logout`)
      .subscribe(() => {
        this.currentUserSubject.next(null);
      });
  }



}
