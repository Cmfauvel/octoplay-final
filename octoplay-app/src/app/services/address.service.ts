import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { User } from '../_models/user';
import { Address } from '../_models/address';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AddressService {
  user: User;
  addresses: Address[] = [];
  baseUrl = `${environment.apiUrl}`;
  public currentAddressesSubject : Subject<Address[]> = new Subject();

  constructor(private http: HttpClient) {
  }

  public createAddress(newAddress: Address, userId): Observable<any>  {
    return this.http
      .post<any>(this.baseUrl + '/user/' + userId + '/location', newAddress);
  }

  selectAddresses(id): void {
    this.http.get<Address[]>(`${this.baseUrl}/user/${id}/locations`).subscribe((resp) => {
      this.currentAddressesSubject.next(resp)
    });
  }

  public updateAddress(address, userId, id): Observable<any> {
    return this.http.put<any>(this.baseUrl + `/user/${userId}/location/${id}`, address);
  }

  public delete(userId, id): Observable<Address> {
    return this.http.delete<Address>(this.baseUrl + `/user/${userId}/location/${id}`);
  }
}
