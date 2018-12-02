import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';
import { AdvSearchComponent } from './adv-search/adv-search.component';
import { ProductListComponent } from './product-list/product-list.component';
import { SearchDetailComponent } from './search-detail/search-detail.component';
import { NewProductComponent } from './new-product/new-product.component';
import { SignComponent } from "./sign/sign.component";

const routes: Route[] = [
  { path: '', component: ProductListComponent },
  { path: 'advSearch', component: AdvSearchComponent},
  { path: 'new', component: NewProductComponent},
  { path:  'signup', component: SignComponent},
  { path: 'searchDetail', component: SearchDetailComponent},
  { path: 'list', component: ProductListComponent},
  { path: '**', redirectTo: '', pathMatch: 'full' }
 
    
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }
