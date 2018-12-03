import { Component, Input } from '@angular/core';
import { Product } from '../model';
import { ProductService } from '../_services/product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../_services/authentication.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {
  @Input() product: Product;
  @Input() isAdmin: Boolean;
  currentUser;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    private auth: AuthenticationService,
    ) {
      this.currentUser = this.auth.currentUser;
    }

  detailProduct(product: Product) {
    this.router.navigate(['product/' + product.id ], {relativeTo: this.route});
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
