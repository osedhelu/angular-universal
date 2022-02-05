import { Component, OnDestroy, OnInit } from '@angular/core';
import { FarmsService } from '@services/FarmsService/farms.service';
import DataSource from 'devextreme/data/data_source';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { venta } from './farm.service';

@Component({
  selector: 'app-farms',
  templateUrl: './farms.component.html',
  styleUrls: ['./farms.component.css']
})
export class FarmsComponent implements OnInit, OnDestroy {
  companies: DataSource
  Databoolen: boolean = false // directo!: string;
  private _unsubscribeAll!: Subject<any>
  private un: any
  MYID!: string
  product: any
  simplePackage: any[] = []
  constructor(private _service: FarmsService) {

    this._unsubscribeAll = new Subject();
    this.un = takeUntil(this._unsubscribeAll);
    this._service.getNFT().pipe(this.un).subscribe((resp: any) => {
      this.Databoolen = true
      this.product = resp.data[0].package.user._id;
      this.simplePackage = resp.data;
      console.log(resp)
      this.companies = new DataSource({
        store: {
          data: resp.data,
          type: 'array',
          key: '_id',
        },
      });
      // this.companies = resp.data

      this.MYID = resp.message
    })

  }

  addCustomItem(data: any) {
    if (!data.text) {
      data.customItem = null;
      return;
    }

    const productIds = this.simplePackage.map((item) => item.ID);
    const incrementedId = Math.max.apply(null, productIds) + 1;
    const newItem = {
      Name: data.text,
      ID: incrementedId,
    };

    data.customItem = this.companies.store().insert(newItem)
      .then(() => this.companies.load())
      .then(() => newItem)
      .catch((error) => {
        throw error;
      });

  }
  ngOnInit() {
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
    this._unsubscribeAll.unsubscribe()
  }
}
