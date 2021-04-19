import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Observable ,  throwError, of } from 'rxjs';

import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpHelperService {

  private URL:string;

  constructor(
    private http: HttpClient
  ) {
    this.URL = '';
  }

  setEnv(url: string) {
    this.URL = url;
  }

  private formatErrors(error: any) {
    return  throwError(error.error);
  }

  get(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    return this.http.get(`${this.URL}${path}`, { params })
      .pipe(catchError(this.formatErrors));
  }


}
