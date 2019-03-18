import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
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
  personData: PersonViewModel;
  addressData: AddressViewModel;
  selectState: StateViewModel;
  selectCity: CityViewModel;
  isLoading = false;
  filteredState: StateViewModel[] = [];
  filteredCity: Array<CityViewModel> = [];
  filteredCityOptions: Observable<CityViewModel[]>;
  continue = false;
  constructor(
    private formBuilder: FormBuilder,
    private personService: PersonService,
    private addressService: AddressService,
    private stateService: StateService,
    private cityService: CityService,
    public dialogRef: MatDialogRef<ModalPersonComponent>,
  ) { }

  ngOnInit() {
    this.buildForm();

    this.filteredOptions = this.personForm.get('gender').valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );

  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
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
    this.continue = true;
  }

  returnForm(): void {
    this.showAddress = false;
  }

  savePerson(): void {
    this.personData = new PersonViewModel(this.personForm.value);
    this.personData.genderId = this.personForm.get('gender').value === 'Masculino' ? 1 : 2;
    this.personService.savePerson(this.personData).subscribe(result => {
      this.saveAddress();
    });
  }

  saveAddress(): void {
    debugger
    const city = this.addressForm.get('city').value;
    this.addressData = new AddressViewModel(this.addressForm.value);
    this.addressData.cityId = city.id;
    this.addressService.saveAddress(this.addressData).subscribe(result => {

    });
  }

  salvarForm(): void {
    this.savePerson();
  }

  displayState(result) {
    // if (result) {
    return result.name;
    // }
  }

  displayFn(result) {
    if (result) {
      return result.name;
    }
  }

  optionChange(event) {
    // this.initFilter();
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
