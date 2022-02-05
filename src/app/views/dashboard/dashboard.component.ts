import { DecimalPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core'
import { PackagesService } from '@services/PackagesService/packages.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ArchitectureInfo, DashboardService } from './dashboard.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  service: DashboardService;
  totalRecaudar: number = 43333
  countries: Iterable<string>;
  active: boolean = false
  pipe: any = new DecimalPipe('en-US');
  types: string[] = ['fullstackedspline', 'spline', 'stackedspline'];
  architecturesInfo: ArchitectureInfo[];
  _unsubscribeAll!: Subject<any>
  un: any

  constructor(service: DashboardService, private _package: PackagesService) {
    this.service = service;
    this.countries = new Set(service.getData().map((item) => item.country));
    this._unsubscribeAll = new Subject();
    this.un = takeUntil(this._unsubscribeAll);
    // this.architecturesInfo = service.getArchitecturesInfo();
  }
  customizeLabel(e) {
    return `${e.argumentText}\n${e.valueText}`;
  }

  calculateTotal(pieChart) {
    // const {itotal} = pieChart.getAllSeries()[0].getVisiblePoints()[0].data
    // console.log()
    const { itotal } = pieChart.getAllSeries()[0].getVisiblePoints().reduce((s, p) => p.data, 0);

    // console.log(totalValue)
    return this.pipe.transform(itotal, '1.00');
  }
  getTOtal() {
    return this.pipe.transform(this.totalRecaudar, '1.00');
  }
  getImagePath(country) {
    return `images/flags/${country.replace(/\s/, '').toLowerCase()}.svg`;
  }
  ngOnInit() {
    this.getMesesPAckage()

  }

  async getMesesPAckage() {
    this._package.getPackagaFo().pipe(this.un).subscribe((resp: any) => {
      this.architecturesInfo = resp.data
      console.warn(resp)
    })
  }

}
