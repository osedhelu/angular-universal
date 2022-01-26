import { Component, OnInit } from '@angular/core';
import { FarmsService } from '@services/FarmsService/farms.service';
import { venta } from './farm.service';

@Component({
  selector: 'app-farms',
  templateUrl: './farms.component.html',
  styleUrls: ['./farms.component.css']
})
export class FarmsComponent implements OnInit {
  companies: venta[] = [];
  // directo!: string;
  MYID!: string
  constructor(private _service: FarmsService) {
    this._service.getNFT().subscribe((resp) => {
      this.companies = resp.data
      this.MYID = resp.message
      console.log(resp)
    })

  }

  ngOnInit() {
  }

}
