import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { of } from 'rxjs';
import { PersonViewModel } from 'src/app/shared/viewModel/person.view-model';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  constructor(
    private http: HttpClient
  ) { }

  getByName(term) {
    let params = new HttpParams();
    if (term) {
      params = params.append('name', term);
    } else {
      return of([]);
    }
    return this.http.get('api/person', { params });
  }


  getAllPerson() {
    return this.http.get('api/person');
  }

  savePerson(data: PersonViewModel) {
    return this.http.post('api/person', data);
  }

  deletePerson(personId: number) {
    return this.http.delete(`api/person/${personId}`);
  }

  editPerson(data: PersonViewModel) {
    return this.http.put(`api/person`, data);
  }
}
