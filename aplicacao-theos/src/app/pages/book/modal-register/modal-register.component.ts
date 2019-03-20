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
  personList: any;
  bookData: BookViewModel;
  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<ModalRegisterComponent>,
    private personService: PersonService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.buildForm();

    // this.bookForm.get('persons').valueChanges.subscribe((x) => {
    //   debugger
    //   console.log(x);
    // });
    // this.bookForm.controls.persons
    //   .valueChanges
    //   .pipe(
    //     debounceTime(300),
    //     distinctUntilChanged(),
    //     tap(() => this.isLoading = true),
    //     switchMap((value) => this.personService.getByName(value)
    //       .pipe(
    //         finalize(() => this.isLoading = false),
    //       )
    //     ))
    //   .subscribe((result: any) => {
    //     this.person = result;
    //   });

    this.bookForm
      .get('person')
      .valueChanges
      .pipe(
        debounceTime(300),
        tap(() => this.isLoading = true),
        switchMap(value => this.personService.getByName(value)
          .pipe(
            finalize(() => this.isLoading = false),
          )
        ))
      .subscribe((result: any) => {
        this.personList = result;
      });
    if (this.data) {
      this.initValues(this.data.book);
    }
  }

  buildForm(): void {
    this.bookForm = this.formBuilder.group({
      title: new FormControl('', Validators.required),
      pages: new FormControl('', Validators.required),
      edition: new FormControl('', Validators.required),
      publishingCompany: new FormControl('', Validators.required),
      // persons: this.formBuilder.array([this.initPerson()])
      person: new FormControl('', Validators.required),
      yearPublication: new FormControl('', Validators.required)
    });
  }

  initPerson() {
    return this.formBuilder.group({
      person: ['', Validators.required]
    });
  }

  initValues(data) {
    this.bookForm.get('title').setValue(data.book.title);
    this.bookForm.get('pages').setValue(data.book.pages);
    this.bookForm.get('edition').setValue(data.book.edition);
    this.bookForm.get('publishingCompany').setValue(data.book.publishingCompany);
    this.bookForm.get('person').setValue(data.person);
    this.bookForm.get('yearPublication').setValue(data.year_publication);
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

  // validParsePersons() {
  //   this.listPersons = [];
  //   const dataPerson = this.bookForm.controls.sales.value;
  //   if (dataPerson.length >= 1) {
  //     for (const element of dataPerson) {
  //       const item = new PersonViewModel({
  //         id: element.id,
  //       });
  //       this.listPersons.push(item);
  //     }
  //   }
  // }


  validForm() {
    this.bookData = new BookViewModel(this.bookForm.value);
    const person = this.bookForm.get('person').value;
    if (person && person.id) {
      this.bookData.personId = person.id;
      this.saveForm();
    } else {
      this.bookForm.get('person').setValidators([Validators.required]);
      this.bookForm.get('person').updateValueAndValidity();
    }
  }

  saveForm() {
    this.dialogRef.close(this.bookData);
  }

  displayFn(result) {
    return result.name;
  }

}
