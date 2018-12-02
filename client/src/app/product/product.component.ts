import { Component, Input } from '@angular/core';
import { Product, Customer } from '../model';
import { ProductService } from '../_services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {
  @Input() product: Product;
  currentUser;

  constructor(
    private productService: ProductService,
    private router: Router) {

    this.currentUser = Customer.fake;

  }

  detailProduct(product) {
    const p = JSON.stringify(product);
    this.router.navigate(['searchDetail', { p: p }]);
  }

  buy() {
    // this.productService.solveProduct(this.product).subscribe(data => {
    //   this.product.solved = true;
    // });
  }

  hasWished() {
    // return this.product.wish.filter(customer => customer.customername === this.currentUser.customername).length > 0;
  }

  wish() {
    // this.productService.wish(this.product, this.currentUser);
  }

  unwish() {
    // this.productService.unwish(this.product, this.currentUser);
  }
}
