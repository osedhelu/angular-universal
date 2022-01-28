import { DecimalPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core'
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
  types: string[] = ['spline', 'stackedspline', 'fullstackedspline'];

  architecturesInfo: ArchitectureInfo[];

  constructor(service: DashboardService) {
    this.service = service;
    this.countries = new Set(service.getData().map((item) => item.country));
    this.architecturesInfo = service.getArchitecturesInfo();
  }
  customizeLabel(e) {
    return `${e.argumentText}\n${e.valueText}`;
  }

  calculateTotal(pieChart) {
    const totalValue = pieChart.getAllSeries()[0].getVisiblePoints().reduce((s, p) => s + p.originalValue, 0);
    return this.pipe.transform(totalValue, '1.0-0');
  }
  getTOtal() {
    return this.pipe.transform(this.totalRecaudar, '1.0-0');
  }
  getImagePath(country) {
    return `images/flags/${country.replace(/\s/, '').toLowerCase()}.svg`;
  }
  ngOnInit() {

  }


}