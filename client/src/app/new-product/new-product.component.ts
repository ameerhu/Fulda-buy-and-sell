import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../_services/product.service';
import { CategoryService } from '../_services/category.service';
import { config } from '../config';
import { Customer } from '../model';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit {

  $categories;
  locations: Array<String>;
  newProduct: FormGroup;
  uploadedImages = [];
  config = config;

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.locations = this.productService.locations;
    this.$categories = this.categoryService.get();
    this.newProduct = this.formBuilder.group({
      'description': ['', Validators.required],
      'name': ['', Validators.required],
      'price': ['', Validators.required],
      'location': ['', Validators.required],
      'categoryId': ['', Validators.required],
      'customerId': [Customer.fake.id],
      'postedDate': new Date(),
      'sold': [false],
      'status': ['pending'],
      'images': [''],
    });
  }

  createNewProduct() {
    this.newProduct.controls['images'].setValue(this.uploadedImages.map(i => i.location));
    this.productService.createProduct(this.newProduct.value);
  }

  onImageRemoved($event) {
    const imageName = $event.file.name;
    const imageSize = $event.file.size;
    this.uploadedImages = this.uploadedImages.filter(e => !(e.name === imageName && e.size === imageSize));
  }

  onImageUploaded($event) {
    const data = $event.serverResponse;
    if (data && data.status === 200) {
      this.uploadedImages.push(JSON.parse(data.response._body));
    }
  }

}
