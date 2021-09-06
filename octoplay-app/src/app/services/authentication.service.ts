import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { User } from '../_models/user';
import { environment } from 'src/environments/environment';
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  public currentUserSubject: Subject<User> = new Subject();
  baseUrl = `${environment.apiUrl}`;

  constructor(
    private http: HttpClient
  ) {
  }

  getUserId(): any {
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(this.getToken());
    const id = decodedToken.id;
    return id;
  }

  getUserRole(): any {
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(this.getToken());
    const role = decodedToken.role;
    return role;
  }

  getToken(): any {
    const token = localStorage.getItem('token');
    if (token) {
      return token;
    };
  }

  findUserById(): void {
    const id = this.getUserId();
    this.http.get<any>(this.baseUrl + '/users/' + id).subscribe((resp) => {
      this.currentUserSubject.next(resp);
    });
  }

  register(newUser: User): Observable<any> {
    return this.http.post<any>(this.baseUrl + '/auth/register', newUser);
  }

  findUserByMail(mail): Observable<any> {
    return this.http.get<User>(this.baseUrl + '/users/mail/' + mail);
  }

  public logIn(userConnected: User): Observable<any> {
    return this.http.post<any>(this.baseUrl + `/auth/login`, userConnected);
  }

  public logOut(): void {
    localStorage.removeItem('token');
    this.http
      .get<any>(`http://localhost:3000/api/v1/auth/logout`)
      .subscribe(() => {
        this.currentUserSubject.next(null);
      });
  }
}
