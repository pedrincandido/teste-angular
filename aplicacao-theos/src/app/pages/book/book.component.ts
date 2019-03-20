import { Component, OnInit, Input } from '@angular/core';
import { BookViewModel } from 'src/app/shared/viewModel/book.view-model';
import { MatDialog } from '@angular/material';
import { ModalDeleteComponent } from '../modal-delete/modal-delete.component';
import { BookService } from './book.service';
import { BroadcasterService } from 'src/app/shared/services/broadcaster.service';
import { ModalRegisterComponent } from './modal-register/modal-register.component';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {
  book: BookViewModel;
  @Input() authorBook: any;
  cardTitle: string;
  cardDescripton: string;
  cardAlt: string;
  cardImagePath: string;
  constructor(
    public dialog: MatDialog,
    private broadcasterService: BroadcasterService,
    private bookService: BookService
  ) { }

  ngOnInit() {
    this.book = new BookViewModel(this.authorBook.book);
    this.cardTitle = this.book.title;
    this.cardImagePath = this.book.url;
  }

  openDialogDelete(): void {
    const dialogRef = this.dialog.open(ModalDeleteComponent, {
      width: '250px',
      data: { name: this.cardTitle, title: 'Excluir Livro' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteBook();
      }
    });
  }

  openDialogEdit(): void {
    const dialogRef = this.dialog.open(ModalRegisterComponent, {
      width: '500px',
      data: { book: this.authorBook }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        result.url = this.authorBook.book.url;
        result.id = this.authorBook.book.id;
        result.authorBookId = this.authorBook.id;
        this.editBook(result);
      }
    });
  }

  private editBook(data): void {
    this.bookService.editBook(data).subscribe(result => {
      if (result) {
        this.refreshBook();
      }
    });
  }

  private deleteBook(): void {
    this.bookService.deleteBook(this.book.id).subscribe(result => {
      if (result) {
        this.refreshBook();
      }
    });
  }

  private refreshBook() {
    this.broadcasterService.broadcast('book.refresh', {
    });
  }
}
