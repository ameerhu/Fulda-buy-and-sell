import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Product, Customer } from '../model';
import { config } from '../config';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  locations = ['Fulda', 'Petersberg', 'Alsfeld', 'Neuhof'];
  advanceSearch$: BehaviorSubject<Boolean> = new BehaviorSubject(false);
  products$: BehaviorSubject<Product[]> = new BehaviorSubject([]);

  constructor(
    private http: HttpClient,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private auth: AuthenticationService
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (this.activatedRoute.snapshot.firstChild.routeConfig.path === 'home') {
          let filters: Array<String> = [
            ...Product.convertQueryParamsintoFilters(this.activatedRoute.snapshot.queryParams)
          ];
          const currentUser = this.auth.currentUser;
          // i.e Customer or Guest user
          if (!currentUser || currentUser.realm !== 'admin') {
            filters = filters.concat(Product.approvedUnsoldProductFilters);
          }
          this.get(filters.join('&'));
        }
      }
    });
  }

  get(queryString?: String) {
    queryString = queryString ? '?' + queryString : '';
    this.http.get<Product[]>(config.apiUrl + '/products' + queryString)
      .subscribe(data => {
        this.products$.next(data);
      });
  }

  getById(id: String): Observable<Product> {
    return this.http.get<Product>(config.apiUrl + '/products/' + id);
  }

  createProduct(formData) {
    return this.http.post(config.apiUrl + '/products', formData)
      .subscribe(data => {
        this.get();
        this.router.navigate(['/']);
      });
  }

  // solveProduct(product: Product) {
  //   product.solved = true;
  //   return this.http.put(config.apiUrl + '/products', Product);
  // }

  wish(product: Product, customer: Customer): Observable<Product> {
    return this.http.post(config.apiUrl + '/wishlists',
      { productId: product.id, customerId: customer.id }
    );
  }

  unwish(product: Product, customer: Customer): Observable<any> {
    console.log({ productId: product.id, customerId: customer.id });
    return this.http.post(config.apiUrl + '/wishlists/unwish',
      { productId: product.id, customerId: customer.id }
    );
  }
}
