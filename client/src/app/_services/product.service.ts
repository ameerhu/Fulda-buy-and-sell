import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Product, Customer } from '../model';
import { config } from '../config';
import { BehaviorSubject } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';

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
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.queryParams.subscribe(queryParam => {
      if (this.activatedRoute.snapshot.url.length === 0) {
        console.log(queryParam);
        const filters = [
          ...Product.approvedUnsoldProductFilters,
          ...Product.convertQueryParamsintoFilters(queryParam)
        ];
        console.log(filters);
        console.log(filters.join('&'));
        this.get(filters.join('&'));
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

  // wish(product: Product, customer: Customer) {
  //   product.wish.push(customer);
  //   return this.http.put(config.apiUrl + '/products', Product);
  // }

  // unwish(product: Product, customer: Customer) {
  //   const index = product.wish.findIndex(u => u.customername === customer.customername);
  //   if (index > -1) {
  //     product.wish.splice(index, 1);
  //   }
  //   return this.http.put(config.apiUrl + '/products', Product);
  // }
}
