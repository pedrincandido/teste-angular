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

  getByName(term, i) {
    let params = new HttpParams();
    if (term[i].person) {
      params = params.append('name', term[i].person);
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
}
