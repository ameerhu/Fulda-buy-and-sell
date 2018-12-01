import { Component, OnInit } from '@angular/core';
import { ProductService } from '../_services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../model';
import { Observable } from 'rxjs';
import { config } from '../config';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[];

  searchTerm;
  constructor(private productService: ProductService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.productService.get();
    this.productService.products$.subscribe(data => {
      this.products = data;
    });

    if (this.route.snapshot.params.d) {
      const d = this.route.snapshot.params.d;
      this.productService.getAllByCriteria(this.route.snapshot.params.d);
      this.router.navigate(['advSearch', { d: d }]);
    } else {
      this.productService.get();
    }
  }

  search() {
    this.productService.get(this.searchTerm);
  }

}
