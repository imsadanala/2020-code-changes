import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-product-alerts',
  templateUrl: './product-alerts.component.html',
  styleUrls: ['./product-alerts.component.scss']
})
export class ProductAlertsComponent implements OnInit {

  constructor() { }

  @Input() product;
  @Output() notifyEmitter = new EventEmitter();

  ngOnInit() {
  }
}
