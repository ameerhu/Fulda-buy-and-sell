import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../model';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../_services/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  product: Product = new Product();
  currentUser;
  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) { }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.route.params.subscribe(params => {
      this.productService.get('filter[where][id]=' + params['id']);
      this.productService.products$.subscribe(product => {
        if (product.length) {
          this.product = product[0];
        }
      });
    });
  }

}
