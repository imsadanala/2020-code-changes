import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  constructor() { }
  product = {
    name: 'soap',
    description: 'cosmotic',
    price: 250,
    isOutStock: true
  };

  ngOnInit() {
  }

  share() {
    window.alert('The product information has been shared!! ');
  }

  onNotify() {
    window.alert('You will be notified when the product goes on sale');
  }
}
