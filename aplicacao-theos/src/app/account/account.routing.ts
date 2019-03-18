import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';

export const AccountRoutes: Routes = [
    {
        path: '',
        children: [{
            path: 'login',
            component: LoginComponent
        }
        ]
    }
];
