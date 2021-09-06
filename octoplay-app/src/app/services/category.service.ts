import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Category } from '../_models/cat';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
baseUri = `${environment.apiUrl}/categories`;
  currentCategoriesSubject  : Subject<Category[]> = new Subject();;
  constructor(private http: HttpClient) {
   }

  selectAll(): void{
    this.http.get<any>(this.baseUri).subscribe((resp) => {
      this.currentCategoriesSubject.next(resp);
    })
  }

  update(id, newValues): Observable<any> {
    return this.http.put<any>(this.baseUri + '/' + id, newValues);
  }

  create(cat): Observable<any> {
    return this.http.post<any>(this.baseUri + '/insert', cat);
  }

  delete(id): Observable<any> {
    return this.http.delete<any>(this.baseUri + '/' + id);
  }
}
