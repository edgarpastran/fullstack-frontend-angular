import { RecoverComponent } from './login/recover/recover.component';
import { GuardService } from './_service/guard.service';
import { LoginComponent } from './login/login.component';
import { ReportsComponent } from './pages/reports/reports.component';
import { SearchComponent } from './pages/search/search.component';
import { PurchaseComponent } from './pages/purchase/purchase.component';
import { ProductComponent } from './pages/product/product.component';
import { PersonEditionComponent } from './pages/person/person-edition/person-edition.component';
import { PersonComponent } from './pages/person/person.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Not403Component } from './pages/not403/not403.component';
import { TokenComponent } from './login/recover/token/token.component';


const routes: Routes = [
  {
    path: 'person', component: PersonComponent, children: [
      {path: 'new', component: PersonEditionComponent},
      {path: 'edition/:id', component: PersonEditionComponent}
    ],
    canActivate: [GuardService]
  },
  {path: 'product', component: ProductComponent, canActivate: [GuardService]},
  {path: 'purchase', component: PurchaseComponent, canActivate: [GuardService]},
  {path: 'search', component: SearchComponent, canActivate: [GuardService]},
  {path: 'reports', component: ReportsComponent, canActivate: [GuardService]},
  {path: 'login', component: LoginComponent}, 
  {path: 'recover', component: RecoverComponent, children: [
    {path: ':token', component: TokenComponent}, 
  ]}, 
  {path: 'not403', component: Not403Component}, 
  {path: '', redirectTo: 'login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
