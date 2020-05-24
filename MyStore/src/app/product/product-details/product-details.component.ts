import { Component, OnInit, Input } from '@angular/core';
import { CartService } from 'src/app/service/cart.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  private cartService: CartService;
  private route: ActivatedRoute;
  @Input() product;
  constructor() {
  }
  items = [];

  ngOnInit() {
  }

  addToCart(product) {
    console.log('Add to cart is called');
    this.cartService.addToCart(product);
  }
}
