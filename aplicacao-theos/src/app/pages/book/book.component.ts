import { Component, OnInit, Input } from '@angular/core';
import { BookViewModel } from 'src/app/shared/viewModel/book.view-model';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {
  @Input() book: BookViewModel;
  cardTitle: string;
  cardDescripton: string;
  cardAlt: string;
  cardImagePath: string;
  constructor() { }

  ngOnInit() {
    this.cardDescripton = this.book.description;
    this.cardTitle = this.book.title;
    this.cardImagePath = this.book.url;
  }
}
