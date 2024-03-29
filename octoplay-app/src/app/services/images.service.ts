import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Image } from '../_models/img';

@Injectable({
  providedIn: 'root'
})

export class ImagesService {
  images: Image[];
  currentImagesSubject: Subject<Image[]> = new Subject();
  baseUrl = `${environment.apiUrl}/images`;

  constructor(private http: HttpClient) {
  }

  getAllImages(): Subscription {
    return this.http.get<any>('http://localhost:3000/api/v1/images')
      .subscribe((resp) => {
        this.currentImagesSubject.next(resp);
      })
  }

  delete(id): Observable<any> {
    return this.http.delete<any>(this.baseUrl + "/" + id)
  }

  update(id, newValues): Observable<any> {
    return this.http.put<any>(this.baseUrl + "/" + id, newValues);
  }

  addImage(image): Observable<any> {
    return this.http.post<any>(this.baseUrl + '/create', image)
  }

  getImgByComponent(name): Observable<any> {
    return this.http.get<any>(this.baseUrl + "/component/" + name)
  }

  getImgRandom(pId, role): Observable<any> {
    return this.http.get<Image>(this.baseUrl + "/" + pId + "/" + role)
  }

  // getImgById(id): Observable<any> {
  //   return this.http.get<any>(this.baseUrl + "/" + id)
  // }

  getImgByProduct(id) {
    return this.http.get<any>(this.baseUrl + "/product/" + id)
  }

  getImagesOfOneProduct(id_product) {
    return this.http.get<any>(`http://localhost:3000/api/v1/images/${id_product}`)
      .pipe(
        map((response) => {
          return response;
        })
      );
  }
}
