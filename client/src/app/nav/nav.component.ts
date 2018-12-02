import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { ProductService } from '../_services/product.service';
import {Route, RouterModule  } from '@angular/router';
import { SignComponent } from '../sign/sign.component';



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
    private productService: ProductService,
  ) {}

  search() {
    this.productService.getAll(this.searchTerm);
  }



}
