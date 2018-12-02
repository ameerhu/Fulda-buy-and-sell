import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { GravatarModule } from 'ngx-gravatar';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavComponent } from './nav/nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { CategoriesComponent } from './categories/categories.component';

import { MatToolbarModule, MatInputModule, MatButtonModule, MatSidenavModule, MatIconModule,
   MatListModule, MatCardModule, MatNativeDateModule, MatBadgeModule, MatMenuModule, MatSelectModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdvSearchComponent } from './adv-search/adv-search.component';
import { SearchDetailComponent } from './search-detail/search-detail.component';
import { ProductComponent } from './product/product.component';
import { ProductListComponent } from './product-list/product-list.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { NewProductComponent } from './new-product/new-product.component';
import { ImageUploadModule } from 'angular2-image-upload';
import { SignComponent } from './sign/sign.component';
import {Route, RouterModule  } from '@angular/router';
import { LoginComponent } from './login/login.component';



@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    ProductComponent,
    ProductListComponent,
    CategoriesComponent,
    NewProductComponent,
    SearchDetailComponent,
    AdvSearchComponent,
    SignComponent,
    LoginComponent
  ],
  imports: [
    ImageUploadModule.forRoot(),
    BrowserModule,
    MatInputModule,
    AppRoutingModule,
    MatDatepickerModule,
    MatNativeDateModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    GravatarModule,
    LayoutModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatCardModule,
    MatBadgeModule,
    MatListModule,
    MatMenuModule
  ],
  providers: [
    HttpClientModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
