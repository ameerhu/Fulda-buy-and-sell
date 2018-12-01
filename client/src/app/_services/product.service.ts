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
  products$: BehaviorSubject<Product[]> = new BehaviorSubject([]);
  approvedUnsoldProductFilters = [
    'filter[include]=owner',
    'filter[include]=category',
    'filter[order]=postedDate%20DESC',
    'filter[where][status]=approved',
    'filter[where][sold]=false',
  ];

  constructor(
    private http: HttpClient,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.queryParams.subscribe(queryParam => {
      console.log(queryParam);
      const filters = [
        ...this.approvedUnsoldProductFilters,
        ...Product.convertQueryParamsintoFilters(queryParam)
      ];
      console.log(filters);
      console.log(filters.join('&'));
    });
  }

  get(queryString?: String) {
    queryString = queryString ? queryString : '';
    this.http.get<Product[]>(config.apiUrl + '/products' + queryString)
      .subscribe(data => {
        this.products$.next(data);
      });
  }

  getAllByCriteria(data?) {
    if (data) {
      data = JSON.parse(data);
      console.log('/products?filter[where][location][like]=' + data.location);
      this.http.get<Product[]>(config.apiUrl + '/products?filter[where][location][like]=' + data.location)
        .subscribe(data => {
          this.products$.next(data);
        });
    } else {
      this.http.get<Product[]>(config.apiUrl + '/products')
        .subscribe(data => {
          this.products$.next(data);
        });
    }
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
