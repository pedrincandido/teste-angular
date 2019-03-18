import { Component, OnInit } from '@angular/core';
import { BookViewModel } from 'src/app/shared/viewModel/book.view-model';
import { BookService } from '../book.service';
import { ModalRegisterComponent } from '../modal-register/modal-register.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-list-book',
  templateUrl: './list-book.component.html',
  styleUrls: ['./list-book.component.scss']
})
export class ListBookComponent implements OnInit {
  books: BookViewModel;
  constructor(
    private bookService: BookService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.loadBook();
  }


  openDialog(): void {
    const dialogRef = this.dialog.open(ModalRegisterComponent, {
      width: '500px',
      // data: { name: '', animal: '' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.saveBook(result);
      }
    });
  }


  private loadBook(): void {
    this.bookService.getAllBook().subscribe((result: BookViewModel) => {
      this.books = result;
    });
  }

  private saveBook(data: BookViewModel): void {
    this.bookService.postBook(data).subscribe(result => {

    });
  }
}
