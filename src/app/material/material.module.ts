import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatTableModule, MatButtonModule, MatSortModule, MatPaginatorModule, MatIconModule, MatFormFieldModule, MatInputModule, MatCardModule, MatSnackBarModule, MatSidenavModule, MatMenuModule, MatDividerModule, MatToolbarModule, MatDialogModule, MatAutocompleteModule, MatDatepickerModule, MatNativeDateModule, MAT_DATE_LOCALE, MatExpansionModule, MatTabsModule, MatProgressBarModule} from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatSortModule,
    MatPaginatorModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatSidenavModule,
    MatMenuModule,
    MatDividerModule,
    MatToolbarModule,
    MatDialogModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatExpansionModule,
    MatTabsModule,
    MatProgressBarModule
  ],
  exports: [
    MatTableModule,
    MatButtonModule,
    MatSortModule,
    MatPaginatorModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatSidenavModule,
    MatMenuModule,
    MatDividerModule,
    MatToolbarModule,
    MatDialogModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatExpansionModule,
    MatTabsModule,
    MatProgressBarModule
  ],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'en-US'}
    //{provide: MAT_DATE_LOCALE, useValue: 'es-ES'}
  ]
})
export class MaterialModule { }
