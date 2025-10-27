import {
  Component,
  signal,
  ChangeDetectionStrategy,
  inject,
  ViewChild,
  effect,
  OnInit,
  AfterViewInit,
} from '@angular/core';
import { CountryService } from '../../services/country.service';
import { Country } from '../../models/country';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { RouterLink } from '@angular/router';
import { ConfirmDialogComponent } from '@app/components/confirm-dialog/confirm-dialog.component';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-country-list',
  standalone: true,
  imports: [
    MatTableModule,
    MatDialogModule,
    RouterLink,
    MatPaginatorModule,
    MatButtonModule,
  ],
  templateUrl: './country-list.component.html',
  styleUrls: ['./country-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountryListComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['id', 'name', 'actions'];
  countries = signal<Country[]>([]);
  readonly countryService = inject(CountryService);
  private readonly dialog = inject(MatDialog);

  readonly dataSource = new MatTableDataSource<Country>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor() {
    effect(() => {
      this.dataSource.data = this.countries();
    });
  }

  ngOnInit() {
    this.countryService.getCountries().subscribe((countries) => {
      this.countries.set(countries);
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  loadCountries() {
    this.countryService.getCountries().subscribe((countries) => {
      this.countries.set(countries);
    });
  }

  deleteCountry(id: number) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Удаление страны',
        message: 'Вы уверены, что хотите удалить эту страну?',
        confirmText: 'Удалить',
        cancelText: 'Отмена',
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.countryService.deleteCountry(id).subscribe(() => {
          this.countries.update((countries) =>
            countries.filter((c) => c.id !== id)
          );
        });
      }
    });
  }
}
