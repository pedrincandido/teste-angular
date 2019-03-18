import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from '../account.service';
import { UserViewModel } from 'src/app/shared/viewModel/user.view-model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  username: string;
  password: string;
  showSpinner: boolean;
  hide = true;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private accountService: AccountService
  ) { }

  ngOnInit() {
    this.buildForm();
  }

  validLogin(): void {
    const userData = new UserViewModel(this.loginForm.getRawValue());
    // this.accountService.postAuthLogin(userData).subscribe(result => {
    //   localStorage.setItem('tokenData', JSON.stringify(result));
    // });

    this.router.navigate(['pages/book']);
  }

  buildForm() {
    this.loginForm = this.formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });
  }

  getErrorMessage() {
    return this.loginForm.get('email').hasError('required') ? 'E-mail é obrigatório' :
      this.loginForm.get('email').hasError('email') ? 'E-mail inválido' :
        '';
  }


}
