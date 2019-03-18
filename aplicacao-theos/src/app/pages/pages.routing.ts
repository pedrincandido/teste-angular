import { Routes } from '@angular/router';
import { PersonComponent } from './person/person.component';
import { BookComponent } from './book/book.component';
import { ListBookComponent } from './book/list-book/list-book.component';

export const PagesRoutes: Routes = [
    {
        path: '',
        children: [
             {
            path: 'person',
            component: PersonComponent,
            data: {
                userName: 'admin',
                initiais: 'ad'
            }
        }, {
            path: 'book',
            component: ListBookComponent,
            data: {
                userName: 'admin',
                initiais: 'ad'
            }
        },
        ]
    }
];
