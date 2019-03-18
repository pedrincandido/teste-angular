import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonComponent } from './person/person.component';
import { BookComponent } from './book/book.component';
import { PagesRoutes } from './pages.routing';
import { RouterModule } from '@angular/router';
import { ListBookComponent } from './book/list-book/list-book.component';
import { DemoMaterialModule } from '../shared/material.module';
import { ModalRegisterComponent } from './book/modal-register/modal-register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalPersonComponent } from './person/modal-person/modal-person.component';
import { NgxMaskModule } from 'ngx-mask';

@NgModule({
  declarations: [
    PersonComponent,
    BookComponent,
    ListBookComponent,
    ModalRegisterComponent,
    ModalPersonComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DemoMaterialModule,
    RouterModule.forChild(PagesRoutes),
    NgxMaskModule.forRoot()
  ],
  entryComponents: [
    ModalRegisterComponent,
    ModalPersonComponent
  ]
})
export class PagesModule { }
