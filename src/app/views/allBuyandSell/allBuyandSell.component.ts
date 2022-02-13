import { Component, OnInit } from '@angular/core';
import DataSource from 'devextreme/data/data_source';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { allBuyandSellService, Hotel } from './allBuyandSell.service';

@Component({
  selector: 'allBuyandSell',
  templateUrl: './allBuyandSell.component.html',
  styleUrls: ['./allBuyandSell.component.css']
})
export class allBuyandSellComponent implements OnInit {
  _unsubscribeAll!: Subject<any>
  un: any
  dataSource: DataSource;

  currentHotel: Hotel;

  listSelectionChanged = (e) => {
    this.currentHotel = e.addedItems[0];
  };

  constructor(public service: allBuyandSellService) {
    this._unsubscribeAll = new Subject();
    this.un = takeUntil(this._unsubscribeAll);
    this.dataSource = service.getDataSource();
    this.currentHotel = service.getFirstHotel();

  }

  ngOnInit() {
    this._unsubscribeAll.next()
    this._unsubscribeAll.complete()
    this._unsubscribeAll.unsubscribe()
  }

}
