import { Component, OnInit } from '@angular/core';
import ArrayStore from 'devextreme/data/array_store';
import DataSource from 'devextreme/data/data_source';
import { AllinvoiceService, Order, Product } from './allinvoice.service';

@Component({
  selector: 'app-invoice',
  templateUrl: './viewPackage.component.html',
  styleUrls: ['./viewPackage.component.css'],
})
export class ViewAllPackagesComponent implements OnInit {

  ngOnInit() {
  }
  productsDataSource: DataSource;

  orders: ArrayStore;

  updatesPerSecond = 100;

  constructor(public service: AllinvoiceService) {
    this.productsDataSource = new DataSource({
      store: service.getProducts(),
      reshapeOnPush: true,
    });

    this.orders = service.getOrders();

    // setInterval(() => {
    //   if (service.getOrderCount() > 500000) {
    //     return;
    //   }

    //   for (let i = 0; i < this.updatesPerSecond / 20; i++) {
    //     service.addOrder();
    //   }
    // }, 50);
  }

  getDetailGridDataSource(product: Product) {
    return new DataSource({
      store: this.orders,
      reshapeOnPush: true,
      filter: ['ProductID', '=', product.ProductID],
    });
  }

  getAmount(order: Order) {
    return order.UnitPrice * order.Quantity;
  }

}
