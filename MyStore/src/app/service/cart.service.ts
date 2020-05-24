import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor() { }
  items = [];
  addToCart(product) {
    this.items.push(product);
    console.log(this.items);
  }
  clearCart() {
    this.items = [];
    return this.getItems();
  }
  getItems() {
    return this.items;
  }
}
