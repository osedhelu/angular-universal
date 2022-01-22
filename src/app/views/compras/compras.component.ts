import { Component, OnInit } from '@angular/core';
import DataSource from 'devextreme/data/data_source';
import { ComprasService, Hotel } from './compras.service';

@Component({
  selector: 'app-compras',
  templateUrl: './compras.component.html',
  styleUrls: ['./compras.component.css'],
})
export class ComprasComponent {

  dataSource: DataSource;

  currentHotel: Hotel;

  listSelectionChanged = (e) => {
    this.currentHotel = e.addedItems[0];
  };

  constructor(service: ComprasService) {
    this.dataSource = service.getDataSource();
    this.currentHotel = service.getFirstHotel();
  }
}
