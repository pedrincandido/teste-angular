import { Component, OnInit } from '@angular/core';
import { DataSource } from '@angular/cdk/table';
import { PersonService } from './person.service';
import { Observable } from 'rxjs';
import { map, finalize } from 'rxjs/operators';
import { MatDialog } from '@angular/material';
import { ModalPersonComponent } from './modal-person/modal-person.component';
import { ModalDeleteComponent } from '../modal-delete/modal-delete.component';
import { PersonViewModel } from 'src/app/shared/viewModel/person.view-model';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss']
})
export class PersonComponent implements OnInit {
  dataSource = new PersonDataSource(this.personService);

  displayedColumns: string[] = ['name', 'dataNascimento', 'cpf', 'email', 'gender', 'actions', 'actions2'];
  constructor(
    public dialog: MatDialog,
    private personService: PersonService,
  ) { }

  ngOnInit() {
  }

  openDialog(data: PersonViewModel): void {
    const dialogRef = this.dialog.open(ModalPersonComponent, {
      width: '500px',
      data: { data }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dataSource = new PersonDataSource(this.personService);
      }
    });
  }


  openDialogDelete(data): void {
    const dialogRef = this.dialog.open(ModalDeleteComponent, {
      width: '250px',
      data: { name: data.name, title: 'Excluir Pessoa' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.detelePerson(data.id);
      }
    });
  }

  detelePerson(personId: number) {
    this.personService.deletePerson(personId).subscribe(result => {
      this.dataSource = new PersonDataSource(this.personService);
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
