import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SideNavComponent } from './shared/side-nav/side-nav.component';

const routes: Routes = [
  { path: '', redirectTo: '/account/login', pathMatch: 'full' },

  {
    path: '',
    component: SideNavComponent,
    children: [
        { path: 'pages', loadChildren: './pages/pages.module#PagesModule' },
    ]
},

{ path: 'account', loadChildren: './account/account.module#AccountModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
