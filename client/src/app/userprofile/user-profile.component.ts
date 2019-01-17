import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../_services/authentication.service';
import { CustomerService } from '../_services/customer.service';
import { ProductService } from '../_services/product.service';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  currentUser;
  customer: Object;
  show_profile = true;
  show_message = false;
  show_wishlist = false;
  user_wish_list: any;
  constructor(
    private customerService: CustomerService,
    private productService: ProductService,
    private auth: AuthenticationService) {
    this.currentUser = this.auth.currentUser;
  }

  ngOnInit() {
    this.customerService.getById(this.currentUser.id).subscribe(
      (data) => {
        this.customer = data;
        console.log(this.customer);
      }
    );
    this.getWishList();
  }

  showWishlist() {
    this.show_profile = false;
    this.show_wishlist = true;
  }

  showMessages() {
    console.log('Show messages');
  }

  showProfile() {
    this.show_profile = true;
    this.show_wishlist = false;
  }

  getWishList() {
    this.customerService.getUserWishList(this.currentUser.id).subscribe((wishList) => {
      this.user_wish_list = wishList;
      console.log(this.user_wish_list);
    });
  }

}
