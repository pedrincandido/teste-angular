import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  constructor(
    private http: HttpClient
  ) { }

  getCityByStateId(stateId: number) {
    let params = new HttpParams();
    params = params.append('stateId', stateId.toString());

    return this.http.get('api/city', { params });
  }
}
