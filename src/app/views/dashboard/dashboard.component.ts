import { DecimalPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core'
import { PackagesService } from '@services/PackagesService/packages.service';
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

  pipe: any = new DecimalPipe('en-US');
  types: string[] = ['fullstackedspline', 'spline', 'stackedspline'];

  architecturesInfo: ArchitectureInfo[];

  constructor(service: DashboardService, private _package: PackagesService) {
    this.service = service;
    this.countries = new Set(service.getData().map((item) => item.country));
    this.architecturesInfo = service.getArchitecturesInfo();
  }
  customizeLabel(e) {
    return `${e.argumentText}\n${e.valueText}`;
  }

  calculateTotal(pieChart) {
    const totalValue = pieChart.getAllSeries()[0].getVisiblePoints().reduce((s, p) => s + p.originalValue, 0);
    return this.pipe.transform(totalValue, '1.00');
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
    const aa = await this._package.getPackagaFo()
    console.warn(aa)
  }

}
