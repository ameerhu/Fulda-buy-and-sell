import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ProductService } from '../_services/product.service';
import { MessagingService } from '../_services/messaging.service';
import { AuthenticationService } from '../_services/authentication.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
  searchTerm;
  currentUser;

  isHandset: Observable<BreakpointState> = this.breakpointObserver.observe(Breakpoints.Handset);
  constructor(
    private breakpointObserver: BreakpointObserver,
    private router: Router,
    private productService: ProductService,
    private messagingService: MessagingService,
    private auth: AuthenticationService
    ) {
      this.currentUser = this.auth.currentUser;
    }

  search() {
    this.router.navigate([''], {
      queryParamsHandling: 'merge',
      queryParams: {
        name: this.searchTerm ? this.searchTerm : null
      }
    });
  }

  toggleAdvanceSearch($event) {
    this.productService.advanceSearch$.next($event);
  }

  logout() {
    this.auth.logout();
  }

  dashboard() {
    this.router.navigate(['home/userprofile']);
    this.productService.getByCustomerId(this.currentUser.id);
  }

  messagesList(customerId){
    this.router.navigate(['/home/allMessages']);
    // this.router.navigate(['/home/messages'], { queryParamsHandling: 'merge', queryParams: { customerId: customerId }});
    this.messagingService.getMsgCustomer(customerId);
    console.log("customer id : "+customerId);
  }

}
