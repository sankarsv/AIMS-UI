import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<any>, handler: HttpHandler): Observable<HttpEvent<any>> {
    let req;
    let headers = request.headers;
    
    headers = headers.append('Cache-Control', 'no-cache')
      .append('Pragma', 'no-cache')
      .append('Accept', 'application/json')
      .append('Cache-Control', 'application/json: charset=utf-8')
      .append('Content-Type', 'application/json');

    if(request.method === 'GET')  headers = this.customHeaderParams(request, headers);

    (environment.production) ? req = request.clone({ headers }) : req = request.clone({ headers, method: 'GET' });

    return handler.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(error);
      })
    );
  }

  customHeaderParams(request: HttpRequest<any>, headers: HttpHeaders) {
    const paramKeyList: Array<string> = request.params.keys();
    if (paramKeyList.length > 0) {
      for (const paramKey of paramKeyList) {
        headers = headers.append(paramKey, request.params.get(paramKey));
      }
    }
    return headers;
  }
}
