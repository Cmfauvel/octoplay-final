import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpParams,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor() {}

  // intercept(
  //   request: HttpRequest<unknown>,
  //   next: HttpHandler
  // ): Observable<HttpEvent<unknown>> {
  //   const newRequest = request.clone({
  //     withCredentials: true,
  //   });
  //   return next.handle(newRequest);
  // }

  
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = localStorage.getItem('token');
    const newRequest = request.clone({
      headers: request.headers.set('Authorization', `Bearer ${token}`),
      withCredentials: true
    });
    return next.handle(newRequest);
  }
}
