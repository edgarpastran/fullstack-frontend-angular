import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material/material.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PersonComponent } from './pages/person/person.component';
import { HttpClientModule } from '@angular/common/http';
import { PersonEditionComponent } from './pages/person/person-edition/person-edition.component';
import { ProductComponent } from './pages/product/product.component';
import { ProductDialogComponent } from './pages/product/product-dialog/product-dialog.component';
import { PurchaseComponent } from './pages/purchase/purchase.component';
import { SearchComponent } from './pages/search/search.component';
import { ReportsComponent } from './pages/reports/reports.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';

@NgModule({
  declarations: [
    AppComponent,
    PersonComponent,
    PersonEditionComponent,
    ProductComponent,
    ProductDialogComponent,
    PurchaseComponent,
    SearchComponent,
    ReportsComponent
  ],
  entryComponents: [
    ProductDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    PdfViewerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
