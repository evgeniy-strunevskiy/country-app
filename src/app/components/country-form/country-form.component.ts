import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CountryService } from '../../services/country.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Country } from '../../models/country';
import { first } from 'rxjs';

@Component({
  selector: 'app-country-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    RouterModule,
  ],
  templateUrl: './country-form.component.html',
  styleUrls: ['./country-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountryFormComponent {
  private readonly fb = inject(FormBuilder);
  private readonly countryService = inject(CountryService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  countryId: number | null = null;

  countryForm = this.fb.group({
    name: ['', [Validators.required, Validators.maxLength(255)]],
  });

  ngOnInit() {
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.countryId = params['id'];
        this.loadCountry();
      }
    });
  }

  loadCountry() {
    if (this.countryId) {
      this.countryService
        .getCountry(this.countryId)
        .pipe(first())
        .subscribe((country) => {
          this.countryForm.patchValue({ name: country.name });
        });
    }
  }

  onSubmit() {
    if (this.countryForm.valid) {
      const country: Country = { name: this.countryForm.value.name! };
      if (this.countryId) {
        this.countryService
          .updateCountry(this.countryId, country)
          .subscribe(() => {
            this.router.navigate(['/']);
          });
      } else {
        this.countryService.createCountry(country).subscribe(() => {
          this.router.navigate(['/']);
        });
      }
    }
  }
}
