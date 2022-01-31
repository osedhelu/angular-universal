import { Component, OnInit } from '@angular/core';
import { FarmsService } from '@services/FarmsService/farms.service';
import DataSource from 'devextreme/data/data_source';
import { venta } from './farm.service';

@Component({
  selector: 'app-farms',
  templateUrl: './farms.component.html',
  styleUrls: ['./farms.component.css']
})
export class FarmsComponent implements OnInit {
  companies: DataSource
  // directo!: string;
  MYID!: string
  product: any
  simplePackage: any[] = []
  constructor(private _service: FarmsService) {
    this._service.getNFT().subscribe((resp) => {
      this.product = resp.data[0].package.user._id;
      this.simplePackage = resp.data;
      this.companies = new DataSource({
        store: {
          data: resp.data,
          type: 'array',
          key: '_id',
        },
      });
      // this.companies = resp.data

      this.MYID = resp.message
      console.log(resp)
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
    console.log('.................', newItem)

  }
  ngOnInit() {
  }

}
