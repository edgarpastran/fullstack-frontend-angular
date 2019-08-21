import { SearchComponent } from './pages/search/search.component';
import { PurchaseComponent } from './pages/purchase/purchase.component';
import { ProductComponent } from './pages/product/product.component';
import { PersonEditionComponent } from './pages/person/person-edition/person-edition.component';
import { PersonComponent } from './pages/person/person.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: 'person', component: PersonComponent, children: [
      {path: 'new', component: PersonEditionComponent},
      {path: 'edition/:id', component: PersonEditionComponent}
    ]
  },
  {path: 'product', component: ProductComponent},
  {path: 'purchase', component: PurchaseComponent},
  {path: 'search', component: SearchComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
