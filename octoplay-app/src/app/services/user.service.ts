import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../_models/user';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({ providedIn: 'root' })
export class UserService {

  baseUrl = `${environment.apiUrl}`;

  constructor(
    private http: HttpClient
  ) { }

  public findOne(id){
    return this.http.get<User>(this.baseUrl + `/users/basicsInfos/${id}`);
  }

  public update(id, newValues) {
    return this.http.put<any>(this.baseUrl + `/user/${id}`, newValues);
  }

  public updatePassword(id, password): Observable<any> {
    return this.http.put<User>(this.baseUrl + `/user/updatePassword/${id}`, password);
  }

  public getNewPassword(mail) {
    return this.http.get<any>(this.baseUrl + `/getMailForNewPassword/${mail}`);
  }

}
