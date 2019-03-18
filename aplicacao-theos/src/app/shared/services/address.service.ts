import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
}
