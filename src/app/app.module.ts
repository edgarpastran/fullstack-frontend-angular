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
import { LoginComponent } from './login/login.component';
import { JwtModule } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';
import { Not403Component } from './pages/not403/not403.component';
import { RecoverComponent } from './login/recover/recover.component';
import { TokenComponent } from './login/recover/token/token.component';

export function tokenGetter() {
  let token = sessionStorage.getItem(environment.TOKEN_NAME);
  return token != null ? token : '';
}

@NgModule({
  declarations: [
    AppComponent,
    PersonComponent,
    PersonEditionComponent,
    ProductComponent,
    ProductDialogComponent,
    PurchaseComponent,
    SearchComponent,
    ReportsComponent,
    LoginComponent,
    Not403Component,
    RecoverComponent,
    TokenComponent
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
    PdfViewerModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ['localhost:8080'],
        blacklistedRoutes: ['http://localhost:8080/login/sendEmail']
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
