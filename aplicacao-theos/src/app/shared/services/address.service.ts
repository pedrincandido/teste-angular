import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AddressViewModel } from '../viewModel/address.view-model';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  constructor(
    private http: HttpClient
  ) { }


  saveAddress(data: AddressViewModel) {
    return this.http.post('api/address', data);
  }

  editAddress(data: AddressViewModel) {
    return this.http.put('api/address', data);
  }

  getAddressByPersonId(personId: number) {
    let params = new HttpParams();
    params = params.append('personId', personId.toString());
    return this.http.get(`api/address/person`, {params});
  }

}
