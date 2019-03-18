import { Component, OnInit } from '@angular/core';
import { DataSource } from '@angular/cdk/table';
import { PersonService } from './person.service';
import { Observable } from 'rxjs';
import { map, finalize } from 'rxjs/operators';
import { MatDialog } from '@angular/material';
import { ModalPersonComponent } from './modal-person/modal-person.component';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss']
})
export class PersonComponent implements OnInit {
  dataSource = new PersonDataSource(this.personService);

  displayedColumns: string[] = ['name', 'dataNascimento', 'cpf', 'email', 'gender'];
  constructor(
    public dialog: MatDialog,
    private personService: PersonService,
  ) { }

  ngOnInit() {
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ModalPersonComponent, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
      }
    });
  }

  getGender(element) {
    if (element === 1) {
      return 'Masculino';
    } else {
      return 'Feminino';
    }
  }
}


export class PersonDataSource extends DataSource<any> {
  isCarregado = false;
  constructor(private personService: PersonService) {
    super();
  }

  connect(): Observable<[]> {
    return this.personService.getAllPerson()
      .pipe(
        map((result: any) => result)
        , finalize(() => {
          this.isCarregado = true;
        })
      );
  }

  disconnect() { }
}
