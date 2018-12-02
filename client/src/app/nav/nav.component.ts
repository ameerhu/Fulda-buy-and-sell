import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ProductService } from '../_services/product.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
  searchTerm;

  isHandset: Observable<BreakpointState> = this.breakpointObserver.observe(Breakpoints.Handset);
  constructor(
    private breakpointObserver: BreakpointObserver,
    private router: Router,
    private productService: ProductService
    ) {}

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
}
