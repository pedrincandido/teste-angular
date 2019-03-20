import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map, debounceTime, tap, switchMap, finalize } from 'rxjs/operators';
import { PersonViewModel } from 'src/app/shared/viewModel/person.view-model';
import { AddressViewModel } from 'src/app/shared/viewModel/address.view-model';
import { PersonService } from '../person.service';
import { AddressService } from 'src/app/shared/services/address.service';
import { StateViewModel } from 'src/app/shared/viewModel/state.view-model';
import { CityViewModel } from 'src/app/shared/viewModel/city.view-model';
import { StateService } from 'src/app/shared/services/state.service';
import { CityService } from 'src/app/shared/services/city.service';

@Component({
  selector: 'app-modal-person',
  templateUrl: './modal-person.component.html',
  styleUrls: ['./modal-person.component.scss']
})
export class ModalPersonComponent implements OnInit {
  personForm: FormGroup;
  addressForm: FormGroup;
  options: string[] = ['Masculino', 'Feminino'];
  filteredOptions: Observable<string[]>;
  showAddress = false;
  personData: PersonViewModel = new PersonViewModel({});
  addressData: AddressViewModel;
  selectState: StateViewModel;
  selectCity: CityViewModel;
  isLoading = false;
  filteredState: StateViewModel[] = [];
  filteredCity: Array<CityViewModel> = [];
  filteredCityOptions: Observable<CityViewModel[]>;
  continue = false;
  isPost = true;
  personId: number;
  addressId: number;
  title = 'Registrar Pessoa';
  constructor(
    private formBuilder: FormBuilder,
    private personService: PersonService,
    private addressService: AddressService,
    private stateService: StateService,
    private cityService: CityService,
    public dialogRef: MatDialogRef<ModalPersonComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    this.buildForm();

    this.filteredOptions = this.personForm.get('gender').valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
    if (this.data.data) {
      this.title = 'Editar Pessoa';
      this.loadPersonData(this.data.data);
      this.isPost = false;
      this.personId = this.data.data.id;
    }

  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  private loadPersonData(data: PersonViewModel) {
    this.personForm.get('name').setValue(data.name);
    this.personForm.get('cpf').setValue(data.cpf);
    this.personForm.get('email').setValue(data.email);
    this.personForm.get('birthDate').setValue(data.birthDate);
    this.personForm.get('gender').setValue(data.genderId === 1 ? 'Masculino' : 'Feminino');

  }

  private _filterCity(value): CityViewModel[] {
    let filterValue = '';
    if (value) {
      filterValue = value.name ? value.name.toLowerCase : value.toLowerCase();
    }

    return this.filteredCity.filter(c => c.name.toLowerCase().includes(filterValue));
  }

  private buildForm(): void {
    this.personForm = this.formBuilder.group({
      name: new FormControl('', Validators.required),
      cpf: new FormControl('', Validators.required),
      birthDate: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      gender: new FormControl('', Validators.required),
    });
  }

  private buildFormAddress() {
    this.addressForm = this.formBuilder.group({
      street: new FormControl('', Validators.required),
      number: new FormControl('', Validators.required),
      neighborhood: new FormControl('', Validators.required),
      cep: new FormControl('', Validators.required),
      complement: new FormControl(''),
      city: new FormControl('', Validators.required),
      state: new FormControl('', Validators.required)
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  continueForm(): void {
    this.showAddress = true;

    if (!this.continue) {
      this.buildFormAddress();
      this.addressForm
        .get('state')
        .valueChanges
        .pipe(
          debounceTime(300),
          tap(() => this.isLoading = true),
          switchMap(value => this.stateService.getStateByName(value)
            .pipe(
              finalize(() => this.isLoading = false),
            )
          ))
        .subscribe((result: any) => {
          this.filteredState = result;
        });

      this.filteredCityOptions = this.addressForm.get('city')
        .valueChanges
        .pipe(
          startWith(''),
          map(value => this._filterCity(value))
        );
    }
    if (!this.isPost) {
      this.getAddressByPersonId();
    }
    this.continue = true;
  }

  returnForm(): void {
    this.showAddress = false;
  }

  savePerson(): void {
    this.personData = new PersonViewModel(this.personForm.value);
    this.personData.genderId = this.personForm.get('gender').value === 'Masculino' ? 1 : 2;
    if (this.isPost) {
      this.personService.savePerson(this.personData).subscribe((result: PersonViewModel) => {
        this.saveAddress(result.id);
      });
    } else {
      this.personData.id = this.personId;
      this.personService.editPerson(this.personData).subscribe((result: PersonViewModel) => {
        this.editAddress();
      });
    }

  }

  saveAddress(personId: number): void {
    const city = this.addressForm.get('city').value;
    this.addressData = new AddressViewModel(this.addressForm.value);
    this.addressData.cityId = city.id;
    this.addressData.personId = personId;
    this.addressService.saveAddress(this.addressData).subscribe(result => {
      if (result) {
        this.dialogRef.close(true);
      }
    });
  }

  editAddress() {
    const city = this.addressForm.get('city').value;
    this.addressData = new AddressViewModel(this.addressForm.value);
    this.addressData.cityId = city.id;
    this.addressData.personId = this.personId;
    this.addressData.id = this.addressId;
    this.addressService.editAddress(this.addressData).subscribe(result => {
      if (result) {
        this.dialogRef.close(true);
      }
    });
  }


  getAddressByPersonId() {
    this.addressService.getAddressByPersonId(this.personId).subscribe((result: any) => {
      if (result) {
        this.addressForm.get('street').setValue(result.street);
        this.addressForm.get('number').setValue(result.number);
        this.addressForm.get('cep').setValue(result.cep);
        this.addressForm.get('state').setValue(result.city.state);
        this.addressForm.get('city').setValue(result.city);
        this.addressForm.get('neighborhood').setValue(result.neighborhood);
        this.addressForm.get('complement').setValue(result.complement);
        this.addressId = result.id;
      }
    });
  }

  salvarForm(): void {
    this.savePerson();
  }

  displayState(result) {
    return result.name;
  }

  displayFn(result) {
    if (result) {
      return result.name;
    }
  }

  optionChange(event) {
    this.filteredCity = [];
    this.addressForm.get('city').reset();
    this.selectState = event;
    this.getCityByStateId(event.id);
  }

  getCityByStateId(stateId: number): any {
    return this.cityService.getCityByStateId(stateId).subscribe((result: CityViewModel[]) => {
      if (result) {
        result.forEach(element => {
          this.filteredCity.push(element);
        });
      }
    });
  }
}
