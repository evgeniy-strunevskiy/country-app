import { Routes } from '@angular/router';
import { CountryFormComponent } from '@app/components/country-form/country-form.component';
import { CountryListComponent } from '@app/components/country-list/country-list.component';

export const routes: Routes = [
  { path: '', component: CountryListComponent },
  { path: 'create', component: CountryFormComponent },
  { path: 'edit/:id', component: CountryFormComponent },
];
