import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';
import { BookViewModel } from 'src/app/shared/viewModel/book.view-model';
import { BookService } from '../book.service';
import { ModalRegisterComponent } from '../modal-register/modal-register.component';
import { MatDialog } from '@angular/material';
import { ModalDeleteComponent } from '../../modal-delete/modal-delete.component';
import { Subscription } from 'rxjs';
import { BroadcasterService } from 'src/app/shared/services/broadcaster.service';

@Component({
  selector: 'app-list-book',
  templateUrl: './list-book.component.html',
  styleUrls: ['./list-book.component.scss']
})
export class ListBookComponent implements OnInit, OnDestroy {
  books: BookViewModel;
  private refreshSubscription: Subscription;
  constructor(
    private bookService: BookService,
    public dialog: MatDialog,
    private broadcasterService: BroadcasterService,
    private ngZone: NgZone
  ) { }

  ngOnInit() {
    this.loadBook();
    this.initSubscriptions();
  }

  ngOnDestroy() {
    this.refreshSubscription.unsubscribe();
  }


  private initSubscriptions() {
    this.refreshSubscription = this.broadcasterService.on('book.refresh')
      .subscribe(() => this.refreshBooksWithNgZone());
  }

  private refreshBooksWithNgZone() {
    this.ngZone.run(() => {
      this.loadBook();
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ModalRegisterComponent, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.saveBook(result);
      }
    });
  }


  private loadBook(): void {
    this.bookService.getAllBook().subscribe((result: any) => {
      if (result) {
        this.books = result;
      }
    });
  }

  private saveBook(data: BookViewModel): void {
    this.bookService.postBook(data).subscribe(result => {
      if (result) {
        this.loadBook();
      }
    });
  }
}
