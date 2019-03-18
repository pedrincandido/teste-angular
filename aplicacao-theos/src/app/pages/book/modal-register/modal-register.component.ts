import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { tap, debounceTime, switchMap, finalize, distinctUntilChanged } from 'rxjs/operators';
import { PersonService } from '../../person/person.service';
import { PersonViewModel } from 'src/app/shared/viewModel/person.view-model';
import { BookViewModel } from 'src/app/shared/viewModel/book.view-model';
@Component({
  selector: 'app-modal-register',
  templateUrl: './modal-register.component.html',
  styleUrls: ['./modal-register.component.scss']
})
export class ModalRegisterComponent implements OnInit {
  bookForm: FormGroup;
  isLoading = false;
  person: any;
  listPersons: any;
  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<ModalRegisterComponent>,
    private personService: PersonService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.buildForm();

    this.bookForm.controls.persons
      .valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        tap(() => this.isLoading = true),
        switchMap((value, index) => this.personService.getByName(value, index)
          .pipe(
            finalize(() => this.isLoading = false),
          )
        ))
      .subscribe((result: any) => {
        this.person = result;
      });
  }

  buildForm(): void {
    this.bookForm = this.formBuilder.group({
      title: new FormControl('', Validators.required),
      pages: new FormControl('', Validators.required),
      edition: new FormControl('', Validators.required),
      publishingCompany: new FormControl('', Validators.required),
      persons: this.formBuilder.array([this.initPerson()])
    });
  }

  initPerson() {
    return this.formBuilder.group({
      person: ['', Validators.required]
    });
  }

  addPerson() {
    const control = this.bookForm.get('persons') as FormArray;
    control.push(this.initPerson());
  }

  removePerson(i: number) {
    const control = this.bookForm.get('persons') as FormArray;
    control.removeAt(i);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  validParsePersons() {
    this.listPersons = [];
    const dataPerson = this.bookForm.controls.sales.value;
    if (dataPerson.length >= 1) {
      for (const element of dataPerson) {
        const item = new PersonViewModel({
          id: element.id,
        });
        this.listPersons.push(item);
      }
    }
  }


  validForm() {
    const book: BookViewModel = new BookViewModel(this.bookForm.value);
    book.person = this.listPersons;
    // if (!this.listPersons.length) {
    //   this.bookForm.get('')
    // }
    this.dialogRef.close(book);
  }

  displayFn(result) {
    if (result) {
      return result.DESCRGRUPOPROD;
    }
  }

}
