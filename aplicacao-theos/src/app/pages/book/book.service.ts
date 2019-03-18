import { Injectable } from '@angular/core';
import { BookViewModel } from 'src/app/shared/viewModel/book.view-model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(
    private http: HttpClient
  ) { }

  getAllBook(): Observable<BookViewModel> {
    return this.http.get<BookViewModel>('api/book');
  }

  postBook(data: BookViewModel) {
    data.url = '../../../assets/books/edipo-rei.jpg';
    return this.http.post<BookViewModel>('api/book', data);
  }
}
