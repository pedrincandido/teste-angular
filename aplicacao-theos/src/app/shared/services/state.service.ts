import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  constructor(
    private http: HttpClient
  ) { }


  getStateByName(term) {
    let params = new HttpParams();
    if (term) {
      params = params.append('name', term);
    } else {
      return of([]);
    }
    return this.http.get('api/state', { params });
  }
}
