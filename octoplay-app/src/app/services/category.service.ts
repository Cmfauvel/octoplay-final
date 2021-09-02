import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
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

  selectAll(){
    this.http.get<any>(this.baseUri).subscribe((resp) => {
      console.log(resp)
      this.currentCategoriesSubject.next(resp);
      console.log(this.currentCategoriesSubject)
    })
  }

  update(id, newValues){
    return this.http.put<any>(this.baseUri + '/' + id, newValues);
  }

  create(cat){
    return this.http.post<any>(this.baseUri + '/insert', cat)
  }

  delete(id){
    return this.http.delete<any>(this.baseUri + '/' + id);
  }
}
