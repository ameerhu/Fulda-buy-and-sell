import { Component, OnInit, Input } from '@angular/core';
import { Product, Messages } from '../model';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../_services/product.service';
import { MessagingService } from '../_services/messaging.service';
import { AuthenticationService } from '../_services/authentication.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  product: Product = new Product();
  messages: Messages = new Messages();
  currentUser;
  msg: String;
  constructor(
    public snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private productService: ProductService,
    private messagingService: MessagingService,
    private auth: AuthenticationService,
  ) { }

  ngOnInit() {
    this.currentUser = this.auth.currentUser;
    this.route.params.subscribe(params => {
      this.productService.getById(params['id']).subscribe(product => {
          this.product = product;
      });
    });
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
    }); 
  }

  msgSend(senderId: string, receiverId: string, msg: string){
    this.messages.customer_Sender_Id = senderId;
    this.messages.customer_Receiver_Id = receiverId;
    this.messages.body = msg;
    this.messages.msgDate = new Date();
    this.messagingService.send(this.messages).subscribe(data=>{
      this.openSnackBar("Notify","You Message has been send");
      this.msg = null;
    });
  }

}
